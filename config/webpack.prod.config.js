const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
  entry: './app/index.jsx',
  output: {
    filename: 'dovotori-main.js',
    path: path.resolve(__dirname, '../build/'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['es2015', { loose: true, modules: false }],
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: ['url-loader?name=/img/[name].[ext]'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'dovotori',
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
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, '../app/utils/serviceWorker.js'),
    }),
    new UglifyJSPlugin({ uglifyOptions: {
      beautify: false,
      mangle: {
        keep_fnames: true,
      },
      compress: {
        warnings: false,
      },
      comments: false,
    } }),
  ],
};
