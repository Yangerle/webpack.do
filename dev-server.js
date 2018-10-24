//webpack dev server(当使用 webpack dev server 和 Node.js API 时启用 HMR)
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
    contentBase: './dist',
    hot: true,
    host: 'localhost'
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(8000, 'localhost', () => {
    console.log('dev server listening on port 8000');
});