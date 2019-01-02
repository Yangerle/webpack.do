const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    // devtool: 'source-map',//避免学习时混淆，产生额外文件还有增大bundle，暂时注释掉，来更清晰的取得编译结果
    plugins:[
	    new CleanWebpackPlugin(['dist']),//在每次构建前清理 /dist 文件夹
	    new UglifyJSPlugin({
            sourceMap:true,
        }),//将在生产环境中使用 source-map 选项，而不是我们在开发环境中用到的 inline-source-map
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),//一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量
    ]
});