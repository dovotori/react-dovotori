const path = require("path");
const webpack = require("webpack");

const port = 8080;
const host = "localhost";

module.exports = {
  mode: "development",
  entry: [
    "react-hot-loader/patch",
    "webpack/hot/only-dev-server",
    "babel-polyfill",
    `webpack-dev-server/client?http://${host}:${port}`,
    "./src/index"
  ],
  output: {
    filename: "dovotori-main.js",
    publicPath: "/"
  },
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: "url-loader?name=/img/[name].[ext]?[hash]?limit=100000"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("developement")
      }
    })
  ],
  devServer: {
    host,
    historyApiFallback: true,
    hot: true,
    inline: true,
    port,
    publicPath: "/"
  }
};
