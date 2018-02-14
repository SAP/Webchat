import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Text from './Text'
import Card from './Card'
import List from './List'
import Buttons from './Buttons'
import Picture from './Picture'
import Carousel from './Carousel'
import QuickReplies from './QuickReplies'

import './style.scss'

class Message extends Component {
  render() {
    const {
      message,
      isLastMessage,
      sendMessage,
      preferences,
      onImageLoaded,
      retry,
      isSending,
      onRetrySendMessage,
      onCancelSendMessage,
    } = this.props
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
        opacity: retry || isSending ? 0.5 : 1,
        accentColor,
      },
    }

    return (
      <div className='RecastAppMessageContainer'>
        <div className={cx('RecastAppMessage', { bot: isBot, user: !isBot })}>
          {image && (
            <img
              className={cx('RecastAppMessage--logo', { visible: displayIcon })}
              src={image}
              style={{}}
            />
          )}

          {type === 'text' && <Text {...messageProps} />}

          {type === 'picture' && <Picture {...messageProps} />}

          {type === 'card' && <Card {...messageProps} sendMessage={sendMessage} />}

          {['carousel', 'carouselle'].includes(type) && (
            <Carousel {...messageProps} sendMessage={sendMessage} />
          )}

          {type === 'list' && <List {...messageProps} sendMessage={sendMessage} />}

          {type === 'buttons' && <Buttons {...messageProps} sendMessage={sendMessage} />}

          {type === 'quickReplies' && (
            <QuickReplies {...messageProps} sendMessage={sendMessage} isLastMessage={isLastMessage} />
          )}
        </div>
        {retry && (
          <div className={cx('RecastAppMessage--retry', { bot: isBot })}>
            Couldn’t send this message <span onClick={onRetrySendMessage} className='button'>Try again</span> |{' '}
            <span onClick={onCancelSendMessage} className='button'>Cancel</span>
          </div>
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
  retry: PropTypes.bool,
  isSending: PropTypes.bool,
  onRetrySendMessage: PropTypes.func,
  onCancelSendMessage: PropTypes.func,
}

export default Message
