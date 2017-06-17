const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
  entry: './app/index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../build/'),
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
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url-loader?name=/img/[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dovotori',
      filename: 'index.html',
      inject: 'body',
      template: path.resolve(__dirname, '../templates/index.ejs'),
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: false,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
      inlineSource: '.(js|css)$',
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
        warnings: true,
      },
      comments: false,
    }),
    new CompressionPlugin({
      test: /\.(js|html)$/,
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};
