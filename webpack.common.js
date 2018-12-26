 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     app: './src/index.js',
	   another: './src/another-module.js'
   },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Production'
     })
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist')
   },
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