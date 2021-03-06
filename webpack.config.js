const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        app: './src/index.js',
        // print: './src/print.js'//测试多入口打包
    },
    devtool: 'inline-source-map',//找到报错源文件及错误位置
    // devServer: {
    //     contentBase:'./dist',
    //     port:'8080',
    //     hot: true//使用 webpack-dev-server：模块热替换
    // },//使用 webpack-dev-server：监听改动编译，并刷新浏览器
    plugins: [
        new CleanWebpackPlugin(['dist']),//在每次构建前清理 /dist 文件夹
        new HtmlWebpackPlugin({
            title:"Output Management"
        }),//重新生成index.html，来自动引用新的入口产生的bundle
        new webpack.HotModuleReplacementPlugin()//使用 webpack-dev-server：模块热替换(无论使用webpack-dev-server,还是使用webpack-dev-server+Node.js API都必须配置)

    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',//express设置：会在服务器脚本用到，以确保文件资源能够在 http://localhost:3000 下正确访问,也影响index.html中引用js的路径
    },
    // mode: "development",//设置开发模式(development mode)，来确保 bundle 是压缩过的(minified)
    mode: "production",//UglifyJSPlugin 插件压缩输出
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