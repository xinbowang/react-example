
import AuthorInfo from 'components/myPage/AuthorInfo';
import Aside from 'components/myPage/Aside';
import PreviewList from 'preview/PreviewList';

let propTypes = {
    previewsName: PT.string,
    notebooks: PT.array,
    myPagePreviews: PT.array,
    changePreviewsName : PT.func,
    initMyPage : PT.func,
    updateUserIntro : PT.func
    
    
}

export default class MyPage extends React.Component{
    constructor(props){
        super(props);
        this.collectionChange = this.collectionChange.bind(this);
        this.nooksCollectionChange = this.nooksCollectionChange.bind(this);
    }
    // 文集点击事件
	collectionChange(collection_id,collection_name){
		this.props.changePreviewsName({collection_id},collection_name);
	}
	// 文集列表点击
    nooksCollectionChange(collection_id, collection_name){
    	this.collectionChange(collection_id, collection_name)
    }
    render(){
		let {collectionChange,nooksCollectionChange} = this;
    	let {previewsName, notebooks, myPagePreviews, location, initMyPage,frameUserInfo,updateUserIntro} = this.props;
   		//console.log(location)
    	let {userInfo} = location.state;
    	// 编辑个人介绍按钮：显示隐藏
    	let isMe = false;
        if(frameUserInfo){
            isMe = frameUserInfo.user_id === userInfo.user_id;
            frameUserInfo = userInfo; // 编辑个人介绍更新数据:由于userInfo是来自loaction不可更改，所以将frameUserInfo赋值
        }
        
   		return (
            <div className="ui container grid">
                <div className="twelve wide column">
                    <AuthorInfo {...{userInfo,initMyPage}}/>
                    <div className="ui secondary pointing menu">
                        <span className="active item">
                            {previewsName}
                        </span>
                    </div>
                    <PreviewList {...{previews:myPagePreviews,collectionChange,initMyPage}} />
                </div>
                <div className="four wide column">
                    <Aside {...{
                    	notebooks,
                    	nooksCollectionChange,
                    	isMe,
                    	userInfo,
                    	updateUserIntro
                    }}/>
                </div>
            </div>
        );
    }
}

MyPage.propTypes = propTypes;
