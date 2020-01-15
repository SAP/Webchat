const path = require('path')
const webpack = require('webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = process.env.NODE_ENV || 'production'

module.exports = {
  entry: './src/index.js',
  resolve: {
    modules: ['../src', '../node_modules'].map(p => path.resolve(__dirname, p)),
  },
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, '../lib'),
    filename: 'index.js',
    publicPath: '/lib/',
    library: ['webchat'],
    libraryTarget: 'umd',
  },
  target: 'web',
  // 'typeof self !== "undefined" ? self : this',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node-modules/,
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.scss$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    // new ExtractTextPlugin({ filename: '[name].scss', disable: false, allChunks: true }),

    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJsPlugin({
      sourceMap: true,
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),

    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) },
    }),
  ],
}
