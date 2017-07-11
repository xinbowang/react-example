
import SignUpPanel from 'components/user/SignUpPanel';
import EntryPanel from 'components/user/Panel';

export default class SignUp extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentWillUnmount(){
    	this.props.clearStates();
    }

    render(){
    	let {signAjax,signRes} = this.props;
        return (
            <EntryPanel >
                <SignUpPanel {...{signAjax,signRes}}/>
            </EntryPanel>
        );
    }
}
SignUp.PropTypes = {
	signAjax : PT.func,
	clearStates : PT.func,
	signRes : PT.object
}