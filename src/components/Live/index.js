import React, { Component } from 'react'
import PropTypes from 'prop-types'
import reduceRight from 'lodash/reduceRight'
import { pathOr } from 'ramda'

import Message from 'components/Message'
import IsTyping from 'components/Message/isTyping'

import './style.scss'

class Live extends Component {
  state = {
    showTyping: false,
  }

  componentDidMount () {
    if (this.messagesList) {
      this.messagesList.scrollTop = this.messagesList.scrollHeight
    }
    window.addEventListener('resize', this.handleScroll)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.messages.length !== this.props.messages.length) {
      this.setState({ showTyping: true }, () => {
        // FIXME Scroll to the bottom when typing. setTimeout is a bit dirty and can be improved
        setTimeout(() => {
          if (this.messagesList) {
            this.messagesList.scrollTop = this.messagesList.scrollHeight
          }
        }, 100)
      })
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      if (this.messagesList) {
        this.messagesList.scrollTop = this.messagesList.scrollHeight
      }
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleScroll)
  }

  handleScroll = () => {
    if (!this.messagesList) {
      return
    }

    const { onScrollBottom } = this.props
    const { clientHeight, scrollTop, scrollHeight } = this.messagesList

    const isScrollBottom = scrollHeight - clientHeight === scrollTop
    onScrollBottom(isScrollBottom)
  }

  onImageLoaded = () => {
    if (this.messagesList) {
      this.messagesList.scrollTop = this.messagesList.scrollHeight
    }
  }

  fmtMessages = () => {
    return reduceRight(
      this.props.messages,
      (acc, cur) => {
        const nextMessage = acc[0]

        cur.displayIcon = !nextMessage || nextMessage.participant.isBot !== cur.participant.isBot

        acc.unshift(cur)
        return acc
      },
      [],
    )
  }

  render () {
    const {
      messages,
      sendMessage,
      preferences,
      onRetrySendMessage,
      onCancelSendMessage,
      containerMessagesStyle,
      showInfo,
      onClickShowInfo,
    } = this.props
    const { showTyping } = this.state
    const lastMessage = messages.slice(-1)[0]

    const sendMessagePromiseCondition
      = lastMessage
      && (pathOr(false, ['data', 'hasDelay'], lastMessage)
        ? pathOr(false, ['data', 'hasNextMessage'], lastMessage)
        : lastMessage.participant.isBot === false)
    const pollMessageCondition = lastMessage && pathOr(false, ['attachment', 'delay'], lastMessage)
    const shouldDisplayTyping = !!(
      lastMessage
      && (sendMessagePromiseCondition || pollMessageCondition)
      && !lastMessage.retry
      && !lastMessage.isSending
      && showTyping
    )

    return (
      <div
        className='RecastAppLive'
        ref={ref => (this.messagesList = ref)}
        onScroll={this.handleScroll}
        style={containerMessagesStyle}
      >
        <div className='RecastAppLive--message-container'>
          {this.fmtMessages().map((message, index) => (
            <Message
              key={message.id}
              message={message}
              sendMessage={sendMessage}
              preferences={preferences}
              onImageLoaded={this.onImageLoaded}
              isLastMessage={messages.length === index + 1}
              retry={message.retry}
              isSending={message.isSending}
              onRetrySendMessage={() => onRetrySendMessage(message)}
              onCancelSendMessage={() => onCancelSendMessage(message)}
              showInfo={showInfo}
              onClickShowInfo={onClickShowInfo}
              error={message.error}
            />
          ))}

          {shouldDisplayTyping && (
            <IsTyping
              image={preferences.botPicture}
              callAfterTimeout={() => this.setState({ showTyping: false })}
              timeout={20000}
            />
          )}
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
  showInfo: PropTypes.bool,
}

export default Live
