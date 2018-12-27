/*
* 懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处
*分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初
*始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。
*/
import _ from 'lodash';
function component() {
	var element = document.createElement('div');
	var button = document.createElement('button');
	var br = document.createElement('br');

	button.innerHTML = 'Click me and look at the console!';
	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	element.appendChild(br);
	element.appendChild(button);
	// Note that because a network request is involved, some indication
	// of loading would need to be shown in a production-level site/app.
	button.onclick = e => import(/* webpackChunkName: "print2" */ './print2').then(module => {
		var print2 = module.default;
		print2();
	});

	return element;
}
document.body.appendChild(component());

