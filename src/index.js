import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { store } from 'store'

import Webchat from './containers/App'

// https://github.com/babel/babel-loader/issues/401
if (!global._babelPolyfill) {
  require('core-js/modules/es6.promise')
  require('core-js/modules/es6.object.assign')
}

export default class RecastWebchat extends Component {
  render () {
    return (
      <Provider store={store}>
        <Webchat {...this.props} />
      </Provider>
    )
  }
}
