
import PreviewList from 'preview/PreviewList';
import Recommend from 'components/home/Recommend';
import con from 'common/url/config.json';

export default class Home extends React.Component{
    constructor(props){
        super(props);
        // 初始化数据
        this.state = {
        	previews : [],
        	authors : []
        }
        this.collectionChange = this.collectionChange.bind(this);
        
    }
    
    // 页面文集点击
    collectionChange(collection_id, collection_name,userInfo){
    	
    	let {history,initMyPage} = this.props;
    	
    	history.push('/my_page',{
    		userInfo
    	});
    	
    	initMyPage(userInfo.user_id,{collection_id},collection_name);
    	
    }
    
    componentDidMount(){
    	$.post(`${con.url}/getPreview`)
    	.done(returnDate=>{
    		if(returnDate.code===0){
    			this.setState({
    				previews : returnDate.data
    			})
    		}
    	})
    	$.post(`${con.url}/getAuthor`)
    	.done(returnDate=>{
    		if(returnDate.code===0){
    			this.setState({
    				authors : returnDate.data
    			})
    		}
    	})
    }

    render(){
    	let {previews,authors} = this.state;
    	let {initMyPage} = this.props;
    	let {collectionChange} = this;
        return (
            <div className="ui container grid">
                <div className="column twelve wide">
                    <PreviewList {...{previews,initMyPage,collectionChange}}/>
                </div>
                <div className="column four wide">
                    <Recommend {...{authors,initMyPage}}/>
                </div>
            </div>
        );
    }
}
Home.PropTypes = {
	initMyPage : PT.func
}