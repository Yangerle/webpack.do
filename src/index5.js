console.log('hellpo')
import _ from 'lodash';
import printMe from './print.js';
console.log(navigator)
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('./service-worker.js').then(registration => {
			console.log('SW registered: ', registration);
		}).catch(registrationError => {
			console.log('SW registration failed: ', registrationError);
		});
	});
}

/*
渐进式网络应用程序(Progressive Web Application - PWA)，是一种可以提供类似于原生应用程序(native app)体验的网络应用程序(web app)。
PWA 可以用来做很多事。其中最重要的是，在离线(offline)时应用程序能够继续运行功能。
这是通过使用名为 Service Workers 的网络技术来实现的。
我们将使用名为 Workbox 的 Google 项目来实现此目的，该项目提供的工具可帮助我们更轻松地配置 web app 的离线支持。


由于是Google提供的服务，所以要翻墙才能生效,并且如果网络不稳定，也会失败
 */