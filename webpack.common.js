 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     // index: './src/index.js',
	   // another: './src/another-module.js',
	   // index1: './src/index1.js',
	   index2: './src/index2.js',
   },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Production'
     })
   ],
   output: {
     filename: '[name].bundle.js',
	   chunkFilename: '[name].bundle.js',//它决定非入口 chunk 的名称
     path: path.resolve(__dirname, 'dist')
   },
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