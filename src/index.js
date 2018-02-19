import React, { Component } from 'react'
import Webchat from './containers/App'

export default class RecastWebchat extends Component {
  render () {
    return <Webchat {...this.props} />
  }
}
