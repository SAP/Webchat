import React, { Component } from 'react'
import PropTypes from 'prop-types'
import reduceRight from 'lodash/reduceRight'

import Message from 'components/Message'
import IsTyping from 'components/Message/isTyping'

import './style.scss'

class Live extends Component {
  state = {
    showTyping: false,
  }

  componentDidMount() {
    this.messagesList.scrollTop = this.messagesList.scrollHeight
    window.addEventListener('resize', this.handleScroll)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messages.length !== this.props.messages.length) {
      this.setState({ showTyping: true })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      this.messagesList.scrollTop = this.messagesList.scrollHeight
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleScroll)
  }

  handleScroll = () => {
    const { onScrollBottom } = this.props
    const { clientHeight, scrollTop, scrollHeight } = this.messagesList

    const isScrollBottom = scrollHeight - clientHeight === scrollTop
    onScrollBottom(isScrollBottom)
  }

  onImageLoaded = () => {
    this.messagesList.scrollTop = this.messagesList.scrollHeight
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

  render() {
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
    const shouldDisplayTyping =
      lastMessage &&
      lastMessage.participant.isBot === false &&
      !lastMessage.retry &&
      !lastMessage.isSending &&
      showTyping

    return (
      <div
        className="RecastAppLive"
        ref={ref => (this.messagesList = ref)}
        onScroll={this.handleScroll}
        style={containerMessagesStyle}
      >
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
              isSending={message.isSending}
              onRetrySendMessage={() => onRetrySendMessage(message)}
              onCancelSendMessage={() => onCancelSendMessage(message)}
              showInfo={showInfo}
              onClickShowInfo={onClickShowInfo}
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
