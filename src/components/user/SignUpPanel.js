import React , {Component} from 'react';
import Panel from './Panel';
import S from './style.scss';
import Validation from 'common/util/validation';
export default class SignUpPanel extends Component{

    constructor(props){
        super(props);
		this.state={
			username : '',
			password : '',
			repass : '',
			userErr : false,
			passErr : false,
			repassErr : false
		}
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangePass = this.onChangePass.bind(this);
		this.onChangeRePass = this.onChangeRePass.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		// 数据验证
		this.validation = new Validation();
		this.validation.addByValue('username',[
	    	{strategy:'isEmpty',errorMsg:'用户名不能为空！'},
	    	{strategy:'hasSpace',errorMsg:'用户名不能有空格！'},
	    	{strategy:'maxLength:6',errorMsg:'用户名不能超过6位！'}
	    ])
	    this.validation.addByValue('password',[
	    	{strategy:'isEmpty',errorMsg:'密码不能为空！'},
	    	{strategy:'hasSpace',errorMsg:'密码不能有空格！'},
	    	{strategy:'maxLength:6',errorMsg:'密码不能超过6位！'}
	    ])
    }
    // 清空Fram下的state
    
    
	onChangeName(ev){
		let {target} = ev;
		
		// 返回字符串或者undefined
		let msg = this.validation.valiOneByValue('username',target.value);
		
		this.setState({
			username : target.value,
			userErr : msg
		})
		
	}
	onChangePass(ev){
		let {repassErr} = this.state;
		let {target} = ev;
		let {cfPasswDom} = this.refs;
		// 返回字符串或者undefined
		let msg = this.validation.valiOneByValue('password',target.value);
		
		this.setState({
			password : target.value,
			passErr : msg
		})
		if(repassErr){ // 如果是字符串，那么调用其方法验证
			this.onChangeRePass();
		}
		
	}
	// 再次输入密码:通过ref来获取真实dom节点，来对比两次的值
	onChangeRePass(){
		let {passwDom,cfPasswDom} = this.refs;
		let msg = passwDom.value===cfPasswDom.value ? '':'两次输入密码不一致！'
		this.setState({
			repass : cfPasswDom.value,
			repassErr : msg
		})
		
	}
	
	// 提交验证
	onSubmit(ev){
		ev.stopPropagation();
		ev.preventDefault();
		
		let {signAjax} = this.props;
		// let {nameDom,passwDom,cfPasswDom} = this.state; // 意思和下面差不多:1
		let {username,password,repass} = this.state;
		let {validation} = this;
		// 验证数据
		// 意思和下面差不多:1
		//let userErr = validation.valiOneByValue('username',nameDom.value);
		//let passErr = validation.valiOneByValue('password',passwDom.value);
		//let repassErr = passwDom.value===cfPasswDom.value ? '':'两次输入密码不一致！';
		let userErr = validation.valiOneByValue('username',username);
		let passErr = validation.valiOneByValue('password',password);
		let repassErr = password===repass ? '':'两次输入密码不一致！';
		// 更新验证
		this.setState({
			userErr,
			passErr,
			repassErr
		})
		// 如果验证没有错误
		if(!userErr && !passErr && !repassErr){
			signAjax({
				username,
				password,
				repass
			})
		}
		
	}
	
    render(){
		let {onChangeName,onChangePass,onChangeRePass,onSubmit} = this;
		let {userErr,passErr,repassErr} = this.state;
		let {signRes} = this.props;
		let signInfo = null;
		// 返回注册与否的信息
		if(signRes){
			if(signRes.code==0){
				signInfo = (
					<div className="ui message positive">
						<p>{signRes.msg}</p>
						<p>马上自动登录!</p>
					</div>
				)
			}else{
				signInfo = (
					<div className="ui message error">
						<p>{signRes.msg}</p>
					</div>
				)
			}
		}
		
		userErr = userErr ? (<p className={S.err}>{userErr}</p>) : null;
		passErr = passErr ? (<p className={S.err}>{passErr}</p>) : null;
		repassErr = repassErr ? (<p className={S.err}>{repassErr}</p>) : null;
        return (
            <div className={S.sign_panel}>
            	{signInfo}
                <form
                    className="ui form"
                    onSubmit = {onSubmit}
                >
                    <div className={`field ${userErr?'error':''}`}>
                        <input
                            type="text"
                            placeholder="用户名"
                            ref="nameDom"
                            onChange={onChangeName}
                        />
                        {userErr}
                    </div>
                    <div className={`field ${passErr?'error':''}`}>
                        <input
                            type="text"
                            placeholder="密码"
                            ref="passwDom"
                            onChange={onChangePass}
                        />
                        {passErr}
                    </div>
                    <div className={`field ${repassErr?'error':''}`}>
                        <input
                            type="text"
                            placeholder="确认密码"
                            ref="cfPasswDom"
                            onChange={onChangeRePass}
                        />
                        {repassErr}
                    </div>
                    <div className="field">
                        <button type="submit"
                            className="ui button fluid primary"
                        >注册</button>
                    </div>
                </form>
            </div>
        );
    }
}
SignUpPanel.PropTypes = {
	signAjax : PT.func,
	signRes :PT.object
}