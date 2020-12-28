const webpack = require("webpack");
const path = require('path')
const slsw = require("serverless-webpack");
const baseConfig = require("./webpack.config")

const NODE_ENV = slsw.lib.webpack.isLocal ? "development" : "production";

const slsConfig = {
  mode: NODE_ENV,
  devtool: 'source-map',

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV,
      WEBPACK_ENV: true
    }),
  ].filter(Boolean),

  entry: slsw.lib.entries,

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  optimization: {
    concatenateModules: false
  }
};

module.exports = Object.assign(baseConfig, slsConfig);