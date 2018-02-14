import React, { Component } from 'react'
import PropTypes from 'prop-types'
import reduceRight from 'lodash/reduceRight'

import Message from 'components/Message'
import IsTyping from 'components/Message/isTyping'

import './style.scss'

class Live extends Component {
  componentDidMount() {
    const container = document.querySelector('.RecastAppLive')
    container.scrollTop = container.scrollHeight
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      const container = document.querySelector('.RecastAppLive')
      container.scrollTop = container.scrollHeight
    }
  }

  onImageLoaded = () => {
    const container = document.querySelector('.RecastAppLive')
    container.scrollTop = container.scrollHeight
  }

  fmtMessages = () => {
    const messages = reduceRight(
      this.props.messages,
      (acc, cur) => {
        const nextMessage = acc[0]

        cur.displayIcon = !nextMessage || nextMessage.participant.isBot !== cur.participant.isBot

        acc.unshift(cur)
        return acc
      },
      [],
    )

    return messages
  }

  render() {
    const { messages, sendMessage, preferences, onRetrySendMessage, onCancelSendMessage } = this.props
    const lastMessage = messages.slice(-1)[0]
    const shouldDisplayTyping = lastMessage && lastMessage.participant.isBot === false && !lastMessage.retry

    return (
      <div className="RecastAppLive" style={{ backgroundColor: preferences.backgroundColor }}>
        <div className="RecastAppLive--message-container">
          {this.fmtMessages().map((message, index) => (
            <Message
              key={message.id}
              message={message}
              sendMessage={sendMessage}
              preferences={preferences}
              onImageLoaded={this.onImageLoaded}
              isLastMessage={messages.length === index + 1}
              retry={message.retry}
              onRetrySendMessage={() => onRetrySendMessage(message)}
              onCancelSendMessage={() => onCancelSendMessage(message)}
            />
          ))}

          {shouldDisplayTyping && <IsTyping image={preferences.botPicture} />}
        </div>
      </div>
    )
  }
}

Live.propTypes = {
  messages: PropTypes.array,
  sendMessage: PropTypes.func,
  preferences: PropTypes.object,
  onRetrySendMessage: PropTypes.func,
  onCancelSendMessage: PropTypes.func,
}

export default Live
