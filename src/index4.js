// import 'babel-polyfill';
/*
* polyfills 虽然是一种模块引入方式，但是并不推荐在主 bundle 中引入 polyfills，
* 因为这不利于具备这些模块功能的现代浏览器用户，会使他们下载体积很大、但却不需要的脚本文件。
* */

// import _ from 'lodash';

import { file, parse } from './globals4.js';

function component() {
	var element = document.createElement('div');

	// element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	element.innerHTML = join(['Hello', 'webpack'], ' ');


// Assume we are in the context of `window`
	this.alert('Hmmm, this probably isn\'t a great idea...')
	return element;
}

document.body.appendChild(component());
fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(json => {
			console.log('We retrieved some data! AND we\'re confident it will work on a variety of browser distributions.')
			console.log(json)
		})
		.catch(error => console.error('Something went wrong when fetching this data: ', error))


//在index.html中通过js判断浏览器类型后，使用动态标签引入polyfills.bundle.js.

// <script>
// var modernBrowser = (
// 		'fetch' in window &&
// 		'assign' in Object
// );
// if ( !modernBrowser ) {
// 	var scriptElement = document.createElement('script');
// 	scriptElement.async = false;
// 	scriptElement.src = '/polyfills.bundle.js';
// 	document.head.appendChild(scriptElement);
// }
// </script>

/*
深度优化：
babel-preset-env package 使用 browserslist 来转译那些你浏览器中不支持的特性。
这里预设了 useBuiltIns 选项，默认值是 false，能将你的全局 babel-polyfill 导入方式，
改进为更细粒度的 import 格式：
import 'core-js/modules/es7.string.pad-start';
import 'core-js/modules/es7.string.pad-end';
import 'core-js/modules/web.timers';
import 'core-js/modules/web.immediate';
import 'core-js/modules/web.dom.iterable';

Node 内置：
像 process 这种 Node 内置模块，能直接根据配置文件(configuration file)进行正确的 polyfills，
且不需要任何特定的 loaders 或者 plugins。查看 node 配置页面获取更多信息。

其他工具 ：
还有一些其他的工具能够帮助我们处理这些老旧的模块。
script-loader 会在全局上下文中对代码进行取值，类似于通过一个 script 标签引入脚本。
在这种模式下，每一个标准的库(library)都应该能正常运行。require, module 等的取值是 undefined。
（当使用 script-loader 时，模块将转化为字符串，然后添加到 bundle 中。
它不会被 webpack 压缩，所以你应该选择一个 min 版本。同时，使用此 loader 将不会有 devtool 的支持。）
这些老旧的模块如果没有 AMD/CommonJS 规范版本，但你也想将他们加入 dist 文件，你可以使用 noParse 来标识出这个模块。
这样就能使 webpack 将引入这些模块，但是不进行转化(parse)，以及不解析(resolve) require() 和 import 语句。这个实践将提升构建性能。
最后，有一些模块支持多种 模块格式，比如混合有 AMD 规范、CommonJS 规范和遗留模块(legacy)。在大多数情况下，他们首先检查define，然后使用一些古怪的代码来导出一些属性。
在这些情况下，可以通过imports-loader设置 define=>false 来强制 CommonJS 路径。
* */