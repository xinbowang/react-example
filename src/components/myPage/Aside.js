import S from './style.scss';
import con from 'common/url/config.json';
export default class Aside extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        	isEdit : false, // 初始化编辑介绍
        	editVal : ''
        }
        this.editMe = this.editMe.bind(this);
        this.editCcontent = this.editCcontent.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.editDone = this.editDone.bind(this);
    }
    
    // 显示编辑
    editMe(){
    	let {userInfo:{user_intro}} = this.props;
    	//console.log(user_intro)
    	this.setState({
    		isEdit:true,
    		editVal : user_intro
    	});
    }
    // 编辑value变化，执行
    editCcontent(ev){
    	this.setState({editVal:ev.target.value});
    }
    // 取消编辑
    cancelEdit(){
    	this.setState({isEdit:false});
    }
	// 提交编辑
	editDone(ev){
		ev.stopPropagation();
		ev.preventDefault();
		let {editVal} = this.state;

        let {userInfo:{user_id},updateUserIntro} = this.props;

        $.post(`${con.url}/editIntro`, {user_intro: editVal, user_id})
        .done(({code})=>{
            if(code===0){
                this.setState({isEdit: false});
                updateUserIntro(editVal);
            }
        });
	}
    render(){
    	let {notebooks,userInfo:{user_intro},nooksCollectionChange,isMe} = this.props;
    	let noteList = null;
    	let {isEdit,editVal} = this.state;
    	let {editCcontent,cancelEdit,editMe,editDone} = this;
    	// 文集
    	noteList = notebooks.map((ele,i)=>{
    		//console.log(ele)
    		let {id: collection_id, collection_name} = ele;
    		return (
    			 <div
                    className= {`item ${S.pointer}`}
                    key={i}
                    onClick={ev=>{
                    	nooksCollectionChange(collection_id,collection_name);
                    }}
                >
                    <i className="book icon"></i>
                    <div className="content">
                        {collection_name}
                    </div>

                </div>
    		)
    	})
    	
        return (
            <div className={S.aside}>

                <div className="introduce">
                    <div className="title">
                        个人介绍
                        {
                        	isMe ? (
                        		<div
                                    className="ui button tiny basic right floated"
                                    onClick={editMe}
                                >
                                    <i className="icon write"></i>
                                    编辑
                                </div>
                        	):null
                        }
                        <div className="ui divider hidden"></div>
						{
		                    isEdit ? (
		                        <form
		                            action=""
		                            className="ui form"
		                            onSubmit={editDone}
		                        >
		                            <div className="field">
		                                <textarea
		                                    value={editVal}
		                                    onChange={editCcontent}
		                                ></textarea>
		                            </div>
		                            <button className="ui positive button" type="submit">
		                                提交
		                            </button>
		                            <button
		                                className="ui negative button"
		                                type="submit"
		                                onClick={cancelEdit}
		                            >
		                                取消
		                            </button>
		                        </form>
		                    ) : (
		                        <p>{user_intro}</p>
		                    )
		                }
                    </div>
                </div>
				
                <div className={S.volume}>
                    <div className={S.title}>
                        我的文集
                    </div>
                    <div className="ui list">
                        {noteList}
                    </div>
                </div>

            </div>
        );
    }
}
Aside.PropTypes = {
	notebooks : PT.array,
	user_intro : PT.string,
	nooksCollectionChange: PT.func,
	updateUserIntro: PT.func,
	isMe : PT.bool
}
