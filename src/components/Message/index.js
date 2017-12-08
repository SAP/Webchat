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
  render() {
    const { message, isLastMessage, sendMessage, preferences, onImageLoaded } = this.props
    const {
      botPicture,
      userPicture,
      accentColor,
      complementaryColor,
      botMessageColor,
      botMessageBackgroundColor,
    } = preferences
    const { displayIcon } = message
    const { type, content } = message.attachment
    const isBot = message.participant.isBot

    const image = isBot ? botPicture : userPicture
    const messageProps = {
      isBot,
      content,
      onImageLoaded,
      style: {
        color: isBot ? botMessageColor : complementaryColor,
        backgroundColor: isBot ? botMessageBackgroundColor : accentColor,
      },
    }

    return (
      <div className={cx('Message', { bot: isBot, user: !isBot })}>
        {image && (
          <img className={cx('Message--logo', { visible: displayIcon })} src={image} style={{}} />
        )}

        {type === 'text' && <Text {...messageProps} />}

        {type === 'picture' && <Picture {...messageProps} />}

        {type === 'card' && <Card {...messageProps} sendMessage={sendMessage} />}

        {type === 'carousel' && <Carousel {...messageProps} sendMessage={sendMessage} />}

        {type === 'list' && <List {...messageProps} sendMessage={sendMessage} />}

        {type === 'quickReplies' && (
          <QuickReplies {...messageProps} sendMessage={sendMessage} isLastMessage={isLastMessage} />
        )}
      </div>
    )
  }
}

Message.propTypes = {
  message: PropTypes.object,
  sendMessage: PropTypes.func,
  preferences: PropTypes.object,
  isLastMessage: PropTypes.bool,
  onImageLoaded: PropTypes.func,
}

export default Message
