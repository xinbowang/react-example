import {Route,Redirect} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/home/Home';
import SignIn from 'view/user/SignIn';
import SignUp from 'view/user/SignUp';
import MyPage from 'view/user/MyPage';
import con from 'common/url/config.json';
import Write from 'view/write/Write';
import LoginHint from 'layout/LoginHint';

import S from './style.scss';

export default class Frame extends React.Component{
    constructor(props){
        super(props);
        //登录
        this.state = {
        	frameUserInfo : null,
        	loginRes : null,
        	signRes : null,
        	autoLogin : false,
        	myPagePreviews: [], 
            notebooks: [], // 文集列表
            previewsName: '所有文章'
        }
        this.userInfoAjax = this.userInfoAjax.bind(this);
        this.signAjax = this.signAjax.bind(this);
        this.clearStates = this.clearStates.bind(this);
        this.userInfoChange = this.userInfoChange.bind(this);
        this.userInfoChange = this.userInfoChange.bind(this);
        this.logout = this.logout.bind(this);
        this.getPreview = this.getPreview.bind(this);
        this.initMyPage = this.initMyPage.bind(this);
        this.changePreviewsName = this.changePreviewsName.bind(this);
        this.updateUserIntro = this.updateUserIntro.bind(this);
        
        
        
    }
    // 更新编辑个人介绍
    updateUserIntro(intro){
        let {frameUserInfo} = this.state;

        frameUserInfo.user_intro = intro;

        this.setState({frameUserInfo});
    }

    // 当登录注册视图切换的时候，组件将要卸载的时候，清除state:防止错误信息显示
    clearStates(){
    	this.setState({
    		loginRes : null,
        	signRes : null
    	})
    }
    // 更改用户信息icon路径
    userInfoChange(frameUserInfo){
    	
    	if(frameUserInfo){ // 防止传入null
    		let {id,username,avatar} = frameUserInfo;
    		avatar = con.url+avatar;
    		frameUserInfo.user_name = username;
    		frameUserInfo.user_id = id;
    		frameUserInfo.avatar = avatar;
    	}
    	this.setState({
    		frameUserInfo
    	})
    }
    // 用户登录ajax
	userInfoAjax(reqData){
		$.post(`${con.url}/login`,reqData)
		.done(res=>{
			//console.log(res);
			if(!res.code){
				this.userInfoChange(res.data);
			}else{
				this.setState({
					loginRes : res
				})
			}
			
		})
	}
	// 用户注册ajax
	signAjax(reqData){
		$.post(`${con.url}/register`,reqData)
		.done(res=>{
			//console.log(res);
			this.setState({
				signRes : res
			})
			if(!res.code){
				setTimeout(()=>{
					this.userInfoChange(res.data);
				},1000)
				
			}
			
		})
	}
	// 退出登录
	logout(){
		$.post(`${con.url}/logout`)
		.done(res=>{
			if(!res.code){
				this.userInfoChange(null);
			}
			
		})
	}
	
	//组件加载完成，判断是否已经登录
	componentDidMount(){
		$.post(`${con.url}/autologin`)
		.done(res=>{
			if( !res.code ){
				this.userInfoChange(res.data);
			}
			this.setState({ // 必须先先判断是否登录过
				autoLogin : true
			})
		})
		
		// 防止my_page页面刷新没有数据: 
		let {state,pathname} = this.props.location;
		//console.log(state)
		if( state && pathname=='/my_page' ){
			let {user_id} = state.userInfo;
			this.initMyPage(user_id,{user_id},'所有文章');
		}
		
	}
	/*-----------------my-page 页面数据------------------*/
	getPreview(data,previewsName){
        $.post(`${con.url}/getPreview`,data)
        .done(({code, data})=>{
            if(code===0){
                this.setState({
                    myPagePreviews: data,
                    previewsName
                });
            }
        });
    }

    // previewsName 就是用户页头像下显示的那几个字
    initMyPage(user_id, previewsData, previewsName){
        this.getPreview(previewsData,previewsName);

        $.post(`${con.url}/getCollection`,{
            user_id
        })
        .done(({code, data})=>{
            if(code===0){
                this.setState({
                    notebooks: data,
                    previewsName
                });
            }
        });

    }
    
    // 用户内部文集事件
    changePreviewsName(collection_id,previewsName){
    	this.getPreview(collection_id,previewsName);
    }

   /* changePreviewsName(previewsName){
        this.setState({previewsName});
    }*/
	
	
    render(){
    	//Rediract:页面重定向
    	let {history} = this.props;
    	let {userInfoAjax,signAjax,clearStates,logout,initMyPage,changePreviewsName,updateUserIntro} = this;
    	let {loginRes,signRes,frameUserInfo,autoLogin,previewsName, notebooks, myPagePreviews} = this.state;
    	// 防止登录后，刷新页面出现注册登录按钮
    	if(!autoLogin){
    		return (<div></div>)
    	}
        return (
            <div className={S.layout}>
                <Nav {...{frameUserInfo,logout,initMyPage,history}}/>
                <Route exact path="/" render={(props)=>{
                	return <Home {...{
                		initMyPage
                	}}
                	{...props}
                	/>
                	
                }}/>
                <Route exact path="/sign_in" render={(props)=>{
                	return frameUserInfo ? (
                		<Redirect to="/" />
                	) : (
                		(<SignIn {...{userInfoAjax,loginRes,clearStates}} />)
                	)
                	
                }}/>
                <Route exact path="/sign_up"  render={(props)=>{
                	return frameUserInfo ? (
                		<Redirect to="/" />
                	) : (
                		(<SignUp {...{signAjax,signRes,clearStates}} />)
                	)
                }}/>
                <Route exact path="/my_page"  render={(props)=>{
                	return props.location.state?(
                		<MyPage 
                		{...{previewsName,
                			notebooks, 
                			myPagePreviews,
                			changePreviewsName,
                			initMyPage,
                			frameUserInfo,
                			updateUserIntro
                		}} {...props}/>
                	):(
                		<Redirect to="/" />
                	)
                	
                }}/>
                <Route path="/write" render={
                	(props)=>(
                		frameUserInfo ? (
                			<Write {...{
                				frameUserInfo
                			}} />
                		):(
                			<Redirect to="/login_hint" />
                		)
                		
                	)
                } />
                <Route path="/login_hint" component={LoginHint}/>
            </div>
        );
    }
}
