const path = require('path');
const webpack = require('webpack');

const port = 8080;

module.exports = {
  entry: [
    `webpack-dev-server/client?http://0.0.0.0:${port}`,
    'webpack/hot/only-dev-server',
    './app/index',
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'react'] },
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
    inline: true,
    port,
  },
};
