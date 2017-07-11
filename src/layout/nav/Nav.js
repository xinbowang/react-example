import { Link, NavLink} from 'react-router-dom';
import S from './style.scss';

export default function Nav(props){
	let {frameUserInfo,logout, initMyPage,history} = props;
	let userLink = null;
	
	if(frameUserInfo){
		let {user_id,user_name,avatar} = frameUserInfo;
		//console.log(frameUserInfo)
		userLink = (
			 <NavLink
                to="/my_page"
                className={`${S.avatar} item`}
                activeClassName="active"
                onClick={ev=>{
                	ev.stopPropagation();
                	ev.preventDefault();
                	
                	history.push('/my_page',{userInfo:frameUserInfo});
                	initMyPage(user_id,{user_id},'所有文章');
                	
                }}
            >
                <img
                    src={avatar}
                    className="ui image avatar"
                    alt=""
                />
                <div className={S.dropDown}>
                    <p>{user_name}</p>
                    <p
                    	onClick={(ev)=>{
                    		ev.stopPropagation();
                    		ev.preventDefault();
                    		logout();
                    	}}
                    >注销</p>
                </div>
            </NavLink>
		)
	}else{
		userLink = [
			(
				<NavLink to="/sign_in"
	                className={`item`}
	                activeClassName="active"
	                key={1}
	            >登录</NavLink>
            ),
            (
            	<NavLink to="/sign_up"
                    className={`item`}
                    activeClassName="active"
                    key={2}
                >注册</NavLink>
            )
		]
	}
    return (
        <div className={`ui fixed secondary pointing menu ${S.nav}`}>
            <div className="ui container">

                <Link to="/"
                    className={`header item`}
                >Noods</Link>

                <NavLink exact to="/"
                    className={`item`}
                    activeClassName="active"
                >首页</NavLink>

                <div className="menu right">
                    {userLink}
                    <NavLink to="/write"
                        className={`item`}
                        activeClassName="active"
                    >写文章</NavLink>
                </div>
            </div>
        </div>
    );
}
Nav.PropTypes = {
	frameUserInfo : PT.object,
	logout : PT.func,
	initMyPage : PT.func
}
