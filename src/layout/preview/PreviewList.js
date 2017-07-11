import {Link} from 'react-router-dom';
import Preview from './Preview';
import S from './style.scss';
import con from 'common/url/config.json';

export default function PreviewList(props){

    let {previews,initMyPage,collectionChange} = props;

    //previews = [];

    previews = previews.map((elt, i)=>{
        let {
            id: article_id, article_title, createdAt,
            preview: previewContent,
            collection_name,
            user_id,
            collection_id,
            user
        } = elt;
        
        //console.log(elt)

        let {avatar, user_name, user_intro} = user;
        avatar = con.url+avatar;
        return (
            <Preview
                {...{
                    article_id,
                    article_title,
                    previewContent,
                    user_id,
                    user_name,
                    createdAt,
                    avatar,
                    user_intro,
                    initMyPage
                }}
                key={i}
            >
               {
               		collection_id ? (
               			 <Link to=""
		                    className={S.tag}
		                    onClick={ev=>{
		                    	ev.stopPropagation();
		                    	ev.preventDefault();
		                    	
		                    	collectionChange && collectionChange(
		                    		collection_id,
		                    		collection_name,
		                    		{
		                    			user_name,
		                    			user_id,
		                    			avatar,
		                    			user_intro
		                    		}
		                    	);
		                    }}
		                    
		                >{collection_name}</Link>
               		) : null
               }
            </Preview>
        );
    });

    return (
        <div>
            {previews}
        </div>
    );
}
PreviewList.PropTypes = {
	previews:PT.array,
	initMyPage : PT.func,
	collectionChange : PT.func
}
