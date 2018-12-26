function getComponent() {
	return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
		var element = document.createElement('div');
		var _ = _.default;
		element.innerHTML = _.join(['Hello', 'webpack'], ' ');
		return element;
	}).catch(error => 'An error occurred while loading the component');
}
getComponent().then(component => {
	document.body.appendChild(component);
})

//由于 import() 会返回一个 promise，因此它可以和 async 函数一起使用。但是，需要使用像 Babel 这样的预处理器和Syntax Dynamic Import Babel Plugin。下面是如何通过 async 函数简化代码：

// async function getComponent() {
// 	var element = document.createElement('div');
// 	const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');
// 	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
// 	return element;
// }
//
// getComponent().then(component => {
// 	document.body.appendChild(component);
// });