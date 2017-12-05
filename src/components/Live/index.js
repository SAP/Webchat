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
    const { messages, sendMessage, preferences } = this.props

    return (
      <div
        className='Live'
        style={{ backgroundColor: preferences.backgroundColor }}
      >
        {messages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            sendMessage={sendMessage}
            preferences={preferences}
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
  preferences: PropTypes.object,
}

export default Live
