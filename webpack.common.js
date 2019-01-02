 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const webpack = require('webpack');


 module.exports = {
   entry: {
     index4: './src/index4.js',
	   polyfills4: './src/polyfills4.js',
	   // another: './src/another-module.js',
	   // index1: './src/index1.js',
	   // index2: './src/index2.js',
	   // index3: './src/index3.js',
   },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Production'
     }),
	   new webpack.ProvidePlugin({
		   // _: 'lodash',
		   join: ['lodash', 'join']
		   //使用 ProvidePlugin 暴露某个模块中单个导出值，只需通过一个“数组路径”进行配置（例如 [module, child, ...children?]）。
		   //要与 tree shaking 配合，才能将 lodash 库中的其他没用到的部分去除，和此配置没有关系，此配置相当于把join抛出为全局。

	   }),//用来将模块转化为全局变量，通过访问一个变量来获取到 package 包。
	   new webpack.HashedModuleIdsPlugin(),//用于解决在利用缓存时，当模块解析顺序发生变化，模块名称跟着变化的问题。

   ],
   output: {
     // filename: '[name].bundle.js',
     filename: '[name].[chunkhash].js',//为了有效利用浏览器相同命名文件缓存机制，使用chunkhash,在js活css内容改变时，更改文件名，使浏览器重新请求
     // filename: 'webpack-numbers.js',
     // library: 'webpackNumbers',
     // libraryTarget: 'umd',
	   /*
	   * 因为 webpack 在入口 chunk 中，包含了某些样板(boilerplate)，特别是 runtime 和 manifest。（译注：样板(boilerplate)指 webpack 运行时的引导代码）
	   * 所以导致我们在运行构建时，在自己不修改文件内容的情况下，文件名可能会变，也可能不会，这就需要SplitChunksPlugin来分离样板
	   *manifest:定义模块的代码
	   *runtime:调用模块的代码
	   * */
	   // chunkFilename: '[name].bundle.js',//它决定非入口 chunk 的名称(此项会对缓存配置有影响，先注释掉)
     path: path.resolve(__dirname, 'dist')
   },
	 // externals: [
		//  './src/library/one3',
		//  './src/library/two3',
		//  './src/library/three3',
		//  // 所有以 "library/" 开始的
		//  /^src\/library\/.+$/,
		//  'lodash',
		//  /*
		// 	* 只有lodash起作用，其他几个还是被打包进了bundle,不知道什么原因？
		// 	* */
		//  // {
		// 	//  lodash: {
		// 	// 	 commonjs: 'lodash',
		// 	// 	 commonjs2: 'lodash',
		// 	// 	 amd: 'lodash',
		// 	// 	 root: '_'
		// 	//  }//外部化 lodash,这意味着你的 library 需要一个名为 lodash 的依赖，这个依赖在用户的环境中必须存在且可用
		//  //
		//  // },
	 //
	 // ],//无法通过在 externals 中指定 library 目录的方式，将它们从 bundle 中排除。你需要逐个排除它们，或者使用正则表达式排除。
	 // externals: {
		//  lodash: {
		// 	 commonjs: 'lodash',
		// 	 commonjs2: 'lodash',
		// 	 amd: 'lodash',
		// 	 root: '_'
		//  }//外部化 lodash,这意味着你的 library 需要一个名为 lodash 的依赖，这个依赖在用户的环境中必须存在且可用
	 // },
	 // optimization: {
		//  runtimeChunk: 'single',//SplitChunksPlugin根据提供的选项将运行时代码拆分成单独的块，可以分离webpack样板
		//  splitChunks: {
		// 	 cacheGroups: {
		// 		 vendor: {
		// 			 test: /[\\/]node_modules[\\/]/,
		// 			 name: 'vendors',
		// 			 chunks: 'all'
		// 		 }//将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。
		// 	 }
		//  }
	 // },

	 // optimization:{
		//  splitChunks:{
		//  	chunks:'all'
		//  }
	 // },//避免产生额外vendors,暂时注释，以禁用The SplitChunks 插件
//WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
//This can impact web performance.
//		Assets:
//vendors~index2.bundle.js (955 KiB)
//由于打包入口文件大小限制，产生了额外vendors，来减少文件的总体积，The SplitChunks 插件会自动处理
	 //原因：(https://stackoverflow.com/questions/41157472/webpack-warning-entrypoint-size-limit-bundle-js/41167614)
	 /*
	  If you want to fix the issue : It was given in more detail in the above link. To simply put :

Use Lazy Loading of modules (this makes sure that we load some sections only if user visits that page)
List out which files are having more size and find a strategy to split them or reduce it's size.
Example to Strategy of splitting files : If we are using jQuery, Bootstrap and Fontawesome, then instead of packing all those into a single big file separate them using entry points in webpack.
Example to reduce files size : If we are using Bootstrap : Are we really using all of Bootstrap? If not, use some loader like bootstrap-loader which will allow us to selectively on/off features/files/functionalities from bootstrap.
Of course above strategies purely depends on what are the libraries that you are using in your application. I just took some examples.
	 */
   module: {
       rules: [
		       {
			       test: require.resolve('./src/index.js'),
			       use: 'imports-loader?this=>window'
		       },
	          //一些传统的模块依赖的 this 指向的是 window 对象
		       //当模块运行在 CommonJS 环境下这将会变成一个问题，也就是说此时的 this 指向的是 module.exports
		       //我们可以通过使用 imports-loader 覆写 this
		       {
			       test: require.resolve('./src/globals4.js'),
			       use: 'exports-loader?file,parse=helpers.parse'
		       },
		       //通过import { file, parse } from './globals4.js'在其他文件中使用

           //JSON 支持实际是内置的
           {
               test:/\.css$/,
               use:[
                   'style-loader',
                   'css-loader'
               ]
           },
           {
               test: /\.(png|svg|jpg|gif)$/,
               use:[
                   'file-loader'
               ]
           },
           {
               test: /\.(woff|woff2|eot|ttf|otf)$/,
               use:[
                   'file-loader'
               ]
           }
       ]
   }
 };