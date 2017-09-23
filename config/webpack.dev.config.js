const path = require('path');
const webpack = require('webpack');

const port = 8080;
const host = 'localhost'

module.exports = {
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/only-dev-server',
    './app/index',
  ],
  output: {
    filename: 'dovotori-main.js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader?name=/img/[name].[ext]?[hash]?limit=100000',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('developement'),
      },
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
