import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Message from 'components/Message'
import IsTyping from 'components/Message/isTyping'

import './style.scss'

class Live extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      const container = document.querySelector('.Live')
      container.scrollTop = container.scrollHeight
    }
  }

  render() {
    const { messages, sendMessage, preferences } = this.props
    const lastMessage = messages.slice(-1)[0]

    return (
      <div className="Live" style={{ backgroundColor: preferences.backgroundColor }}>
        <div className="Live--message-container">
          {messages.map((message, index) => (
            <Message
              key={message.id}
              message={message}
              sendMessage={sendMessage}
              preferences={preferences}
              isLastMessage={messages.length === index + 1}
            />
          ))}

          {lastMessage &&
            lastMessage.participant.isBot === false && <IsTyping image={preferences.botPicture} />}
        </div>

        <div className="Live--slogan">{'We run with Recast.AI'}</div>
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
