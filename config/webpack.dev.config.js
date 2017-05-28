const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './app/index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../build'),
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'react', 'react-hmre'] },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader?name=/app/assets/img/[name].[ext]?[hash]?limit=100000',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
