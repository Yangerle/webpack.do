# webpack.do (webpack v4.28.2 learning)
1. node命令启动服务器(server.js or dev-server.js)。
2. webpack用于编译。
3. webpack-dev-server用于编译后在自带服务器打开，每次改动都会刷新页面。
4. 模块热替换(Hot Module Replacement 或 HMR)
允许在运行时更新各种模块，而无需进行**完全刷新**
（ webpack 提供的最有用的功能之一）。
5. shim和polyfill有什么区别?

    shim:楔子，垫子
    
    polyfill:填充物
    
    在js中：
    
    shim一般指一些做兼容性的库，用来弥补旧浏览器对新特性支持的不足。都会预先加载，强调新旧浏览器使用同一套代码。
    
    pollfill也会对浏览器的不足做补充，但一般都会用语句来判断此浏览器是否支持此特性，然后通过动态引入script标签的方法来加载。
    
3. 热更新(HMR)不能和`[chunkhash]`同时使用。

    解决：分离开发环境与生产环境配置文件的output选项。
    
    来源于：[webpack指令npm start出现错误Cannot use [chunkhash] for chunk](https://segmentfault.com/q/1010000011438869/a-1020000011441168)
    
4. 使用`imports-loader`插件报错如下：

    ```bash
    ERROR in ./src/index.js 5:0
    Module parse failed: 'import' and 'export' may only appear at the top level (5:0
    )
    You may need an appropriate loader to handle this file type.
    |
    | // import printMe from './print.js';
    > import './styles.css';
    | // import _ from 'lodash';
    | // import { file, parse } from './globals.js';

    ```
    
    原因：If there is an import statement in the module, webpack will throw an error to the terminal because the statement is in a function, not at the top level. You can use CommonJS require function instead.
    
    解决：
    ```bash
		       //我们可以通过使用 imports-loader 覆写 this
	       //在 CommonJS 环境下,this 指向的是 module.exports,可以通过使用 imports-loader 覆写 this
	       //所以要在应用运行在CommonJS 环境时开启此项，不然会问题。因为默认环境已经变为CommonJS，ES6 中的 import / export就会在编译时报错。
	       //所以要在CommonJS 环境下，再启用此项

    ```
    
    来源于：['import' and 'export' may only appear at the top level #39](https://github.com/webpack-contrib/imports-loader/issues/39)
