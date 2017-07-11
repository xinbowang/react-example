
import SignInPanel from 'components/user/SignInPanel';
import EntryPanel from 'components/user/Panel';


export default class SignIn extends React.Component{
    constructor(props){
        super(props);
    }
    // 组件将要卸载的时候，清空Form组件的State数据,防止验证错误信息显示
	componentWillUnmount(){
    	this.props.clearStates();
    }
    render(){
		let {userInfoAjax,loginRes} = this.props;
        return (
            <EntryPanel >
                <SignInPanel {...{userInfoAjax,loginRes}}/>
            </EntryPanel>
        );
    }
}
SignIn.PropTypes = {
	userInfoAjax : PT.func,
	clearStates : PT.func,
	loginRes : PT.object
}
