const path = require('path')
const precss = require('precss')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const env = process.env.NODE_ENV || 'development'

module.exports = {

  entry: ['babel-polyfill', './src/script.js'],

  resolve: {
    modules: ['../src', '../node_modules'].map(p => path.resolve(__dirname, p)),
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'webchat.js',
    publicPath: '/dist/',
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
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [require('autoprefixer')],
          },
        },
        'sass-loader',
      ],
      exclude: /node_modules/,
    }]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
      minimize: true,
    }),

    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) }
    }),
  ],

}
