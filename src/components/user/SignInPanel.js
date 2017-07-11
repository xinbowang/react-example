import React , {Component} from 'react';
import Panel from './Panel';
import S from './style.scss';
import Validation from 'common/util/validation';

export default class SignInPanel extends Component{

    constructor(props){
        super(props);
		this.state = {
			username : '',
			password : '',
			userErr : false,
			passErr : false
		}
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangePass = this.onChangePass.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
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
		let {target} = ev;
		// 返回字符串或者undefined
		let msg = this.validation.valiOneByValue('password',target.value);
		
		this.setState({
			password : target.value,
			passErr : msg
		})
		
	}
	onSubmit(ev){
		ev.stopPropagation();
		ev.preventDefault();
		let {userInfoAjax} = this.props;
		let {nameDom,passwDom} = this.refs;
		let {validation} = this;
		// 验证数据
		let userErr = validation.valiOneByValue('username',nameDom.value);
		let passErr = validation.valiOneByValue('password',passwDom.value);
		// 更新验证
		this.setState({
			userErr,
			passErr
		})
		// 如果验证没有错误
		if(!userErr && !passErr){
			console.log(0)
			userInfoAjax({
				username : nameDom.value,
				password : passwDom.value
			})
			console.log(1)
		}
		
	}
    render(){
    	let {onChangePass,onChangeName,onSubmit} = this;
		let {userErr,passErr} = this.state;
		let {loginRes} = this.props;
		let loginErr = null;
		
		userErr = userErr ? (<p className={S.err}>{userErr}</p>) : null;
		passErr = passErr ? (<p className={S.err}>{passErr}</p>) : null;
		
		// 如果密码或用户名错误
		if(loginRes && loginRes.code!==0 ){
			loginErr = (
				<div className="ui message error">
					<p>{loginRes.msg}</p>
				</div>
			)
		}
		
		
        return (
            <div className={S.sign_panel}>
            	{loginErr}
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

                    <div className="field">
                        <button type="submit"
                            className="ui button fluid primary"
                        >登录</button>
                    </div>
                </form>
            </div>
        );
    }
}
SignInPanel.PropTypes = {
	userInfoAjax : PT.func,
	loginRes :PT.object
}