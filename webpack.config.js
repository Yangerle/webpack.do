const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js'
    },
    devtool: 'inline-source-map',//找到报错源文件及错误位置
    devServer: {
        contentBase:'./dist',
        port:'8080'
    },//监听改动编译，并刷新浏览器
    plugins: [
        new CleanWebpackPlugin(['dist']),//在每次构建前清理 /dist 文件夹
        new HtmlWebpackPlugin({
            title:"Output Management"
        }),//重新生成index.html，来自动引用新的入口产生的bundle

    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',//express设置：会在服务器脚本用到，以确保文件资源能够在 http://localhost:3000 下正确访问
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