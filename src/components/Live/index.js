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
    const { messages, sendMessage, preferences } = this.props
    const { showTyping } = this.state
    const lastMessage = messages.slice(-1)[0]

    return (
      <div
        className="RecastAppLive"
        ref={ref => (this.messagesList = ref)}
        onScroll={this.handleScroll}
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
            />
          ))}

          {lastMessage &&
            showTyping &&
            lastMessage.participant.isBot === false && (
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
  onScrollBottom: PropTypes.func,
}

export default Live
