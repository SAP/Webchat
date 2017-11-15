const path = require('path')
const precss = require('precss')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

const env = process.env.NODE_ENV || 'development'

module.exports = {

  entry: ['babel-polyfill', './src/index.js'],

  devtool: 'cheap-module-source-map',

  resolve: {
    root: path.join(__dirname, '/../src'),
    modules: ['src', 'node_modules'],
  },

  output: {
    path: path.join(__dirname, '/../dist'),
    filename: 'webchat.js',
  },

  loaders: [{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  }, {
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'postcss-loader'],
  }],

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) }
    }),
  ],

}
