import _ from 'lodash';
import './style.css';
import Icon from './icon.jpg';
import Data from './data.json'
import printMe from './print.js';
function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');


    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack',Data.links[0].url], ' ');
    element.classList.add('hello');
    var myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);
    return element;
}

let element = component();
document.body.appendChild(element);
if(module.hot){
    module.hot.accept('./print.js',function () {
        console.log('Accepting the updated printMe module!')
        document.body.removeChild(element);
        element = component();
        document.body.appendChild(element);
        printMe();
        // 按钮的 onclick 事件仍然绑定在旧的 printMe 函数上。为了让它与 HRM 正常工作，我们需要使用 module.hot.accept 更新绑定到新的 printMe 函数上：
    })
}
//借助于 style-loader 的帮助，CSS 的模块热替换实际上是相当简单的。当更新 CSS 依赖模块时，此 loader 在后台使用 module.hot.accept 来修补(patch) <style> 标签。