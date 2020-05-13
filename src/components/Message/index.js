import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import contains from 'ramda/es/contains'
import { safeBooleanValue } from 'helpers'

import Text from './Text'
import Card from './Card'
import List from './List'
import Buttons from './Buttons'
import Picture from './Picture'
import Carousel from './Carousel'
import QuickReplies from './QuickReplies'

import './style.scss'

class Message extends Component {
  state = {
    exceptionThrownOccurred: false,
  }

  componentDidCatch (error, info) {
    this.setState({ exceptionThrownOccurred: true })
    console.error(error, info)
  }

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
      readOnlyMode,
    } = this.props
    const {
      botPicture,
      userPicture,
      accentColor,
      complementaryColor,
      botMessageColor,
      botMessageBackgroundColor,
    } = preferences
    const { displayIcon, attachment, participant } = message
    const { type, content, error, title, markdown } = attachment
    const { exceptionThrownOccurred } = this.state
    if (exceptionThrownOccurred) {
      const style = {
        color: '#fff',
        backgroundColor: '#f44336',
        padding: '1.0rem',
        textAlign: 'center',
      }

      return (
        <div style={style} className={'RecastAppText CaiAppText'}>
          An Error has occured, unable to display this message
        </div>
      )
    }
    if (!content) {
      console.error('Missing content unable to proceed')
      return null
    }
    const { isBot } = participant

    const image = isBot ? botPicture : userPicture
    const messageProps = {
      isBot,
      // Make sure we display the title of a button/quickReply click, and not its value
      content: title || content,
      isMarkdown: safeBooleanValue(markdown),
      readOnlyMode,
      onImageLoaded,
      style: {
        color: isBot ? (error ? '#fff' : botMessageColor) : complementaryColor,
        backgroundColor: isBot ? (error ? '#f44336' : botMessageBackgroundColor) : accentColor,
        opacity: retry || isSending ? 0.5 : 1,
        accentColor,
      },
    }
    if (!showInfo && type === 'client_data') {
      return null // ignore type client_data
    }
    return (
      <div
        className={cx('RecastAppMessageContainer CaiAppMessageContainer', {
          bot: isBot,
          user: !isBot,
        })}
      >
        <div className={cx('RecastAppMessage CaiAppMessage', { bot: isBot, user: !isBot })}>
          {image && (
            <img
              className={cx('RecastAppMessage--logo CaiAppMessage--logo', { visible: displayIcon })}
              src={image}
              style={{}}
            />
          )}

          {type === 'text' && <Text {...messageProps} />}

          {type === 'picture' && <Picture {...messageProps} />}

          {type === 'card' && <Card {...messageProps} sendMessage={sendMessage} />}

          {contains(type, ['carousel', 'carouselle']) && (
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
          {isBot && showInfo && type === 'client_data' && (
            <div className={cx('RecastAppMessage--retry CaiAppMessage--retry', { bot: isBot })}>
              Custom JSON message type. Not visible in channels.
            </div>
          )}
          {isBot && showInfo && (
            <div
              className='RecastAppMessage--JsonButton CaiAppMessage--JsonButton'
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
          <div className={cx('RecastAppMessage--retry CaiAppMessage--retry', { bot: isBot })}>
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
  readOnlyMode: PropTypes.bool,
}

export default Message
