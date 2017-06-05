const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: { colors: true },
}).listen(config.devServer.port, 'localhost', (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Listening at http://localhost:' + config.devServer.port + '/');
  return null;
});
