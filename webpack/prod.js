const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = process.env.NODE_ENV || 'production'

module.exports = {
  entry: ['./src/script.js'],

  resolve: {
    modules: ['../src', '../node_modules'].map(p => path.resolve(__dirname, p)),
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'webchat.js',
    publicPath: '/dist/',
  },

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
        use: [
          'style-loader',
          { loader: 'css-loader', options: { minimize: true } },
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
      },
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJsPlugin({
      sourceMap: true,
    }),

    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(env) },
    }),
  ],
}
