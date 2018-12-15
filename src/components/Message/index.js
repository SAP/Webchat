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
  render () {
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
      showInfo,
      onClickShowInfo,
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
    const { type, content, error, title } = message.attachment
    const isBot = message.participant.isBot

    const image = isBot ? botPicture : userPicture
    const messageProps = {
      isBot,
      // Make sure we display the title of a button/quickReply click, and not its value
      content: title || content,
      onImageLoaded,
      style: {
        color: isBot ? (error ? '#fff' : botMessageColor) : complementaryColor,
        backgroundColor: isBot ? (error ? '#f44336' : botMessageBackgroundColor) : accentColor,
        opacity: retry || isSending ? 0.5 : 1,
        accentColor,
      },
    }

    return (
      <div className={cx('CaiAppMessageContainer', { bot: isBot, user: !isBot })}>
        <div className={cx('CaiAppMessage', { bot: isBot, user: !isBot })}>
          {image && (
            <img
              className={cx('CaiAppMessage--logo', { visible: displayIcon })}
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
            <QuickReplies
              {...messageProps}
              sendMessage={sendMessage}
              isLastMessage={isLastMessage}
            />
          )}

          {isBot
            && showInfo && (
            <div
              className='CaiAppMessage--JsonButton'
              onClick={() => {
                if (onClickShowInfo) {
                  onClickShowInfo(message)
                }
              }}
            >
              <img src='https://cdn.cai.tools.sap/website/bot-builder/info.png' />
            </div>
          )}
        </div>
        {retry && (
          <div className={cx('CaiAppMessage--retry', { bot: isBot })}>
            Couldn’t send this message{' '}
            <span onClick={onRetrySendMessage} className='button'>
              Try again
            </span>{' '}
            |{' '}
            <span onClick={onCancelSendMessage} className='button'>
              Cancel
            </span>
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
  showInfo: PropTypes.bool,
  onClickShowInfo: PropTypes.func,
  error: PropTypes.bool,
}

export default Message
