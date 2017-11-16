const webpack = require('webpack')
const webpackConfig = require('../webpack/dev')

const bundler = webpack(webpackConfig)

bundler.watch({}, err => {
  if (err) {
    console.error(err)
    return
  }

  console.log('Waiting for changes')
})
