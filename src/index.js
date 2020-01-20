import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { store } from 'store'
import { createStore } from 'redux'
import reducers from './reducers'

import Webchat from './containers/App'

// https://github.com/babel/babel-loader/issues/401
// if (!global._babelPolyfill) {
//   require('@babel/polyfill')
// }

export default class CaiWebchat extends Component {

  constructor (props) {
    super(props)
    this.store = createStore(reducers)
  }

  render () {
    return (
      <Provider store={this.store}>
        <Webchat {...this.props} />
      </Provider>
    )
  }
}
