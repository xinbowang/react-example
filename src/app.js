import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';


import Frame from 'layout/frame/Frame';

require('semantic/dist/semantic.min.css');
require('semantic/dist/semantic.min.js');

// 判断是否有cookie
//jQuery 跨域发送cookie
$.ajaxSetup({
    xhrFields: {withCredentials: true}
});


ReactDOM.render(
	<Router>
		<Route path="/" component={Frame} />
	</Router>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
