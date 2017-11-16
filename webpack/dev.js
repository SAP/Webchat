const path = require('path')
const precss = require('precss')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const env = process.env.NODE_ENV || 'development'

module.exports = {

  entry: ['babel-polyfill', './src/index.js'],

  devtool: 'cheap-module-source-map',

  resolve: {
    modules: ['../src', '../node_modules'].map(p => path.resolve(__dirname, p)),
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'webchat.js',
    publicPath: '/dist/'
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node-modules/,
      options: {
        cacheDirectory: true,
      },
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      exclude: /node_modules/,
    }]
  },

  plugins: [
    new ProgressBarPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) }
    }),
  ],

}
