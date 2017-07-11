import {Link,withRouter} from 'react-router-dom';
import S from './style.scss';

function AuthorInfo(props){
	let {userInfo,history,initMyPage} = props;
	let {user_id,avatar,user_name} = userInfo;
    return (
        <div className={S.author_info}>
            <Link
                to="/my_page"
                className={S.avatar}
                onClick={
                	ev=>{
                		ev.stopPropagation();
                		ev.preventDefault();
                		history.push('/my_page',{
                			userInfo
                		});
                		//console.log(userInfo)
                		initMyPage(user_id,{user_id},'所有文章');
                	}
                }
            >
                <img src={avatar} alt=""/>
            </Link>

            <div className={S.title}>
                <Link
                    to="/my_page"
                    className={S.name}
                    onClick={
	                	ev=>{
	                		ev.stopPropagation();
	                		ev.preventDefault();
	                		history.push('/my_page',{
	                			userInfo
	                		});
	                		//console.log(userInfo)
	                		initMyPage(user_id,{user_id},'所有文章');
	                	}
	                }
                >
                    {user_name}
                </Link>
            </div>

        </div>
    );
}
AuthorInfo.PropTypes = {
	userInfo: PT.object,
	initMyPage:PT.func
}
export default withRouter (AuthorInfo);