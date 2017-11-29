import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Text from './Text'
import Card from './Card'
import List from './List'
import Picture from './Picture'
import Carousel from './Carousel'
import QuickReplies from './QuickReplies'

import './style.scss'

class Message extends Component {

  render () {
    const { message, isLastMessage, sendMessage } = this.props
    const { type, content } = message.attachment
    const isBot = message.participant.isBot

    return (
      <div className={cx('Message', { bot: isBot })}>
        <img
          className='Message--logo'
          src='https://cdn.recast.ai/bots/desjardins/icon-dialogue-chatbot.png'
        />

        {type === 'text' && <Text content={content} isBot={isBot} />}

        {type === 'picture' && <Picture content={content} isBot={isBot} />}

        {type === 'card' && <Card content={content} isBot={isBot} sendMessage={sendMessage} />}

        {type === 'carousel' && <Carousel content={content} isBot={isBot} sendMessage={sendMessage} />}

        {type === 'list' && <List content={content} isBot={isBot} sendMessage={sendMessage} />}

        {type === 'quickReplies' && (
          <QuickReplies
            content={content}
            isBot={isBot}
            sendMessage={sendMessage}
            isLastMessage={isLastMessage}
          />
        )}

      </div>
    )
  }
}

Message.propTypes = {
  message: PropTypes.object,
  sendMessage: PropTypes.func,
  isLastMessage: PropTypes.bool,
}

export default Message
