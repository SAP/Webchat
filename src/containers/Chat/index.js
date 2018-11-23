import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'
import _concat from 'lodash/concat'
import { propOr } from 'ramda'

import {
  postMessage,
  pollMessages,
  removeMessage,
  addBotMessage,
  addUserMessage,
} from 'actions/messages'

import Header from 'components/Header'
import Live from 'components/Live'
import Input from 'components/Input'

import './style.scss'

@connect(
  state => ({
    token: state.conversation.token,
    chatId: state.conversation.chatId,
    channelId: state.conversation.channelId,
    conversationId: state.conversation.conversationId,
    lastMessageId: state.conversation.lastMessageId,
    messages: state.messages,
  }),
  {
    postMessage,
    pollMessages,
    removeMessage,
    addUserMessage,
    addBotMessage,
  },
)
class Chat extends Component {
  state = {
    messages: this.props.messages,
    showSlogan: true,
    inputHeight: 50, // height of input (default: 50px)
  }

  messagesDelays = []

  componentDidMount() {
    const { sendMessagePromise, show } = this.props

    this._isPolling = false
    if (!sendMessagePromise && show) {
      this.doMessagesPolling()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { messages, show } = nextProps

    if (messages !== this.state.messages) {
      this.setState({ messages }, () => {
        const { getLastMessage } = this.props
        if (getLastMessage) {
          getLastMessage(messages[messages.length - 1])
        }
      })
    }

    if (show && show !== this.props.show && !this.props.sendMessagePromise && !this._isPolling) {
      this.doMessagesPolling()
    }
  }

  componentWillUnmount() {
    if (this.messagesDelays.length) {
      console.log("Unmount me");
      this.messagesDelays.forEach(messageDelay => clearTimeout(messageDelay))
    }
  }

  shouldHideBotReply = (responseData) => {
    return responseData.conversation && responseData.conversation.skill === 'qna'
    && Array.isArray(responseData.nlp) && !responseData.nlp.length
    && Array.isArray(responseData.messages) && !responseData.messages.length;
  }

  sendMessage = (attachment, userMessage) => {
    const {
      token,
      channelId,
      chatId,
      postMessage,
      sendMessagePromise,
      addUserMessage,
      addBotMessage,
    } = this.props
    const payload = { message: { attachment }, chatId }

    const backendMessage = {
      ...payload.message,
      isSending: true,
      id: `local-${Math.random()}`,
      participant: {
        isBot: false,
      },
    }

    if (userMessage)
      userMessage = {...JSON.parse(JSON.stringify(backendMessage)), attachment: { type: 'text', content: userMessage}};

    this.setState(
      prevState => ({ messages: _concat(prevState.messages, [backendMessage]) }),
      () => {
        if (sendMessagePromise) {
          addUserMessage(userMessage || backendMessage);

          sendMessagePromise(backendMessage)
            .then(res => {
              if (!res) {
                throw new Error('Fail send message')
              }
              const data = res.data
              const messages =
                data.messages.length === 0
                  ? [{ type: 'text', content: 'No reply', error: true }]
                  : data.messages
              if (!this.shouldHideBotReply(data)) {
                 messages.forEach((message, index) => {
                   if (message.delay) {
                     const delay = message.delay * 1000 * (index + 1);
                     console.log("Add delay", delay);
                     this.messagesDelays[index] = setTimeout(() => addBotMessage([messages], data), delay)
                   } else {
                     addBotMessage([message], data)
                   }
                 })
              }
            })
            .catch(() => {
              addBotMessage([{ type: 'text', content: 'No reply', error: true }])
            })
        } else {
          postMessage(channelId, token, payload).then(() => {
            if (this.timeout) {
              clearTimeout(this.timeout)
              this.timeoutResolve()
              this.timeout = null
            }
          })
        }
      },
    )
  }

  cancelSendMessage = message => {
    this.props.removeMessage(message.id)
  }

  retrySendMessage = message => {
    this.props.removeMessage(message.id)
    this.sendMessage(message.attachment)
  }

  doMessagesPolling = async () => {
    if (this._isPolling) {
      return
    }
    this._isPolling = true

    let shouldPoll = true
    let index = 0

    do {
      const { lastMessageId, conversationId, channelId, token } = this.props
      let shouldWaitXseconds = false
      let timeToSleep = 0
      try {
        const { waitTime } = await this.props.pollMessages(
          channelId,
          token,
          conversationId,
          lastMessageId,
        )
        shouldPoll = waitTime === 0
        shouldWaitXseconds = waitTime > 0
        timeToSleep = waitTime * 1000
      } catch (err) {
        shouldPoll = false
      }
      index++

      /**
       * Note: If the server returns a waitTime != 0, it means that conversation has no new messages since 2 minutes.
       * So, let's poll to check new messages every "waitTime" seconds (waitTime = 120 seconds per default)
       */
      if (shouldWaitXseconds) {
        index = 0
        await new Promise(resolve => {
          this.timeoutResolve = resolve
          this.timeout = setTimeout(resolve, timeToSleep)
        })
        this.timeout = null
      } else if (!shouldPoll && index < 4) {
        await new Promise(resolve => setTimeout(resolve, 300))
      }
    } while (shouldPoll || index < 4)
    this._isPolling = false
  }

  render() {
    const {
      closeWebchat,
      preferences,
      showInfo,
      onClickShowInfo,
      containerMessagesStyle,
      containerStyle,
      secondaryView,
      primaryHeader,
      secondaryHeader,
      secondaryContent,
      logoStyle,
      show,
      enableHistoryInput,
    } = this.props
    const { showSlogan, messages, inputHeight } = this.state

    return (
      <div
        className={cx('RecastAppChat', { open: show, close: !show })}
        style={{ backgroundColor: preferences.backgroundColor, ...containerStyle }}
      >
        {secondaryView ? (
          secondaryHeader
        ) : primaryHeader ? (
          primaryHeader(closeWebchat)
        ) : (
          <Header
            closeWebchat={closeWebchat}
            preferences={preferences}
            key="header"
            logoStyle={logoStyle}
          />
        )}
        <div
          className="RecastAppChat--content"
          style={{
            height: `calc(100% - ${50 + inputHeight}px`,
          }}
          key="content"
        >
          {secondaryView
            ? secondaryContent
            : [
                <Live
                  key="live"
                  messages={messages}
                  preferences={preferences}
                  sendMessage={this.sendMessage}
                  onScrollBottom={bool => this.setState({ showSlogan: bool })}
                  onRetrySendMessage={this.retrySendMessage}
                  onCancelSendMessage={this.cancelSendMessage}
                  showInfo={showInfo}
                  onClickShowInfo={onClickShowInfo}
                  containerMessagesStyle={containerMessagesStyle}
                />,
                <div
                  key="slogan"
                  className={cx('RecastAppChat--slogan', {
                    'RecastAppChat--slogan--hidden': !showSlogan,
                  })}
                >
                  {'We run with Recast.AI'}
                </div>,
              ]}
        </div>
        <Input
          menu={preferences.menu && preferences.menu.menu}
          onSubmit={this.sendMessage}
          preferences={preferences}
          onInputHeight={height => this.setState({ inputHeight: height })}
          enableHistoryInput={enableHistoryInput}
          inputPlaceholder={propOr('Write a reply', 'userInputPlaceholder', preferences)}
          characterLimit={propOr(0, 'characterLimit', preferences)}
        />
      </div>
    )
  }
}

Chat.propTypes = {
  postMessage: PropTypes.func,
  closeWebchat: PropTypes.func,
  pollMessages: PropTypes.func,
  chatId: PropTypes.string,
  channelId: PropTypes.string,
  lastMessageId: PropTypes.string,
  conversationId: PropTypes.string,
  messages: PropTypes.array,
  preferences: PropTypes.object,
  showInfo: PropTypes.bool,
  sendMessagePromise: PropTypes.func,
  primaryHeader: PropTypes.func,
  secondaryView: PropTypes.bool,
  secondaryHeader: PropTypes.any,
  secondaryContent: PropTypes.any,
  getLastMessage: PropTypes.func,
  containerMessagesStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  show: PropTypes.bool,
  enableHistoryInput: PropTypes.bool,
}

export default Chat
