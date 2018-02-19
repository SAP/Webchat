import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { store } from 'store'

import Webchat from './containers/App'

export default class RecastWebchat extends Component {
  render () {
    return (
      <Provider store={store}>
        <Webchat {...this.props} />
      </Provider>
    )
  }
}
