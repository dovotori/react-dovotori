const path = require('path');
const webpack = require('webpack');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const port = 8080;
const host = 'localhost';


module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    `webpack-dev-server/client?http://${host}:${port}`,
    './app/index',
  ],
  output: {
    filename: 'dovotori-main.js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   loader: 'url-loader?name=/img/[name].[ext]?[hash]?limit=100000',
      // },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('developement'),
      },
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, '../app/utils/serviceWorker.js'),
    }),
  ],
  devServer: {
    host,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port,
    publicPath: '/',
  },
};
