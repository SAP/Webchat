import React, { Component } from 'react'
import { Provider } from 'react-redux'
import api from 'middlewares/api'
import { configureStore } from '@reduxjs/toolkit'
import reducer from 'reducers/reducer'

import Webchat from './containers/App'

export const store = configureStore({
  reducer,
  middleware: [api],
})

export default class CaiWebchat extends Component {

  constructor (props) {
    super(props)
    this.store = store
  }

  render () {
    return (
      <Provider store={this.store}>
        <Webchat {...this.props} />
      </Provider>
    )
  }
}
