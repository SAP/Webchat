import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from 'components/Header'
import Live from 'components/Live'
import Input from 'components/Input'

import './style.scss'

class Chat extends Component {

  render () {
    const { closeWebchat } = this.props

    return (
      <div className='Chat'>
        <Header closeWebchat={closeWebchat} />

        <Live />

        <Input />
      </div>
    )
  }

}

Chat.propTypes = {
  closeWebchat: PropTypes.func,
}

export default Chat
