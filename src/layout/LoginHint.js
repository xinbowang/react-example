export default class extends React.Component{
	constructor(props){
		super(props);
		
	}
	componentDidMount(){
        let {history} = this.props;

        setTimeout(()=> history.push('/sign_in'), 2000 );
    }
	render(){
		return(
			<div className="ui aligned center header">
                请先登录, 即将自动跳转...
            </div>
		)
	}
}
