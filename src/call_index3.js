//ES2015 模块导入：
import * as webpackNumbers from 'webpack-numbers';
// ...
webpackNumbers.wordToNum('Two');
//CommonJS 模块导入：
var webpackNumbers = require('webpack-numbers');
// ...
webpackNumbers.wordToNum('Two');
//AMD 模块导入：
require(['webpackNumbers'], function ( webpackNumbers) {
	// ...
	webpackNumbers.wordToNum('Two');
});

//用户还可以通过 script 标签来加载和使用此 library：
/*
<!doctype html>
<html>
  ...
  <script src="https://unpkg.com/webpack-numbers"></script>
  <script>
    // ...
    // 全局变量
    webpackNumbers.wordToNum('Five')
    // window 对象中的属性
    window.webpackNumbers.wordToNum('Five')
    // ...
  </script>
</html>
*/



//通过以下配置方式，将 library 暴露：
/*
global 对象中的属性，用于 Node.js。
this 对象中的属性。
*/

