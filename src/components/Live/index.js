import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Message from 'components/Message'

import './style.scss'

class Live extends Component {

  componentDidUpdate () {
    const container = document.querySelector('.Live')
    container.scrollTop = container.scrollHeight
  }

  render () {
    const { messages, sendMessage } = this.props

    return (
      <div className='Live'>
        {messages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            sendMessage={sendMessage}
            isLastMessage={messages.length === index + 1}
          />
        ))}
      </div>
    )
  }

}

Live.propTypes = {
  messages: PropTypes.array,
  sendMessage: PropTypes.func,
}

export default Live
