
import {Component} from 'react';
import con from 'common/url/config.json';
import S from './style.scss';

let propTypes = {
	frameUserInfo : PT.object
}

export default class Write extends Component{

    constructor(props){
        super(props);
		this.state = {
			collectionSel : [],
			titleVal : '',
			areaVal : '',
			addColVal : ''
			
		}
		this.titleValChange = this.titleValChange.bind(this);
		this.areaValChange = this.areaValChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.addCollection = this.addCollection.bind(this);
		this.addColValChange = this.addColValChange.bind(this);
		// 保存collectionId
		this.collectionName = {};
		
    }
    titleValChange(ev){
    	this.setState({
    		titleVal : ev.target.value
    	})
    }
    areaValChange(ev){
    	this.setState({
    		areaVal : ev.target.value
    	})
    }
    addColValChange(ev){
    	this.setState({
    		addColVal : ev.target.value
    	})
    }
    onSubmit(ev){
    	ev.stopPropagation();
    	ev.preventDefault();
    	
    	let {titleVal:article_title,
    		areaVal:article_content
    	} = this.state;
    	
    	let {collectionName} = this;
    	let {user_id} = this.props.frameUserInfo;
    	let collection_id = this.refs.cltInput.value;
    	
    	console.log(collection_id)
    	
    	let collection_name = collectionName[collection_id];
    	
    	if(article_title!=='' && collection_id!=='' && article_content!==''){
    		
    		$.post(`${con.url}/addArticle`,{
    			article_title,
    			article_content,
    			user_id,
    			collection_id,
    			collection_name
    		})
    		.done(({code})=>{
    			if(!code){
    				this.setState({
    					titleVal : '',
    					areaVal : ''
    				})
    			}
    		})
    	}
    	
    	
    }
    addCollection(ev){
    	let {addColVal} = this.state;
    	if(ev.keyCode == 13 && addColVal.trim()!==''){
    		let {user_id} = this.props.frameUserInfo;
    		
    		$.post(`${con.url}/addCollection`,{
    			name : addColVal,
    			user_id
    		})
    		.done(({code,data})=>{
    			if(!code){
    				this.setState({
    					addColVal : '',
    					collectionSel : data
    				})
    			}
    		})
    	}
    }
    
    componentDidMount(){
    	
    	let {user_id} = this.props.frameUserInfo;
    	$.post(`${con.url}/getCollection`,{user_id})
    	.done(({code,data})=>{
    		if(code===0){
				this.setState({
    				collectionSel : data
    			})
    		}
    	})
    	// 绑定ui下面的自带下拉事件
    	//console.log(this.refs.dropdown)
    	$(this.refs.dropdown).dropdown();
    }
    // 组件将要卸载的时候，手动解绑react不受控的事件
    componentWillUnmount(){
    	$(this.refs.dropdown).off();
    }

    render(){
    	let {titleValChange,areaValChange,onSubmit,addCollection,addColValChange,collectionName} = this;
    	let {collectionSel,titleVal,areaVal,addColVal} = this.state;
    	
    	// 文集-下拉菜单
		
		let selects = null;
		selects = collectionSel.length ? collectionSel.map((ele,i)=>{
			collectionName[ele.id] = ele.collection_name;
			return (
				<div className="item" key={i} data-value={ele.id}>
					{ele.collection_name}
				</div>
			)
		}):null;
		
        return(
            <div className="ui container">
                <header className="ui header dividing">
                    <h1>写文章</h1>
                </header>
                <form
                    className="ui form"
                    onSubmit={onSubmit}
                >
                    <div className="field">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="标题"
                            onChange={titleValChange}
                            value={titleVal}
                        />
                    </div>
                    <div className="fields">
                        <div className="field five wide column required">
                            <div className="ui selection dropdown" id="writeArtical" ref="dropdown">
                                <input
                                    type="hidden"
                                    name="album"
                                    ref="cltInput"
                                />
                                {
                                	selects ? (<div className="default text">选择一个文集</div>):(<div className="default text">还沒有文集，请添加</div>)
                                }
                                <i className="dropdown icon"></i>
                                <div className="menu">
                                {selects}
                                </div>
                            </div>
                        </div>
                        <div className="field eleven wide column">
                            <input
                                type="text"
                                className=""
                                placeholder="回车, 添加文集"
                                value={addColVal}
                                onChange={addColValChange}
								onKeyDown={addCollection}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <textarea
                            rows="16"
                            className=""
                            placeholder="随便写点文字. . ."
                            value={areaVal}
                            onChange={areaValChange}
                        >
                        </textarea>
                    </div>
                    <div className="field">
                        <button type="submit"
                            className="ui button primary"
                        >保存</button>
                    </div>

                </form>
            </div>
        )
    }
}

Write.propTypes = propTypes;
