import {Link,withRouter} from 'react-router-dom';
import con from 'common/url/config.json';
function Author({user,initMyPage,history}){
    let {user_name, avatar,id:user_id,user_intro} = user;
    avatar = con.url+avatar;
    return (
        <div className="item">
            <Link
                to="/"
                className="ui mini avatar image"
                onClick={ev=>{
                	ev.stopPropagation();
                	ev.preventDefault();
                	history.push('/my_page',{ //location下state传递数据
                		userInfo : {
                			user_id,
					        user_name,
					        avatar,
					        user_intro
                		}
                	});
                	initMyPage(user_id,{user_id},'所有文章');
                }}
            >
                <img src={avatar} alt=""/>
            </Link>
            <div className="content">
                <div className="header">
                    {user_name}
                </div>
            </div>
        </div>

    );
}
Author.PropTypes = {
	initMyPage : PT.func,
}
// 高阶组件：可以应用顶层的props
export default withRouter(Author);