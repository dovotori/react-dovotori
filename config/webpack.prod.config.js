const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './app/index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../app/build/'),
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
        loader: 'file-loader?name=/app/assets/img/[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
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
  ],
};
