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