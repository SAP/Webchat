import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cx from 'classnames'
import propOr from 'ramda/es/propOr'
import concat from 'ramda/es/concat'

import {
  postMessage,
  pollMessages,
  removeMessage,
  removeAllMessages,
  addBotMessage,
  addUserMessage,
} from 'actions/messages'

import Header from 'components/Header'
import Live from 'components/Live'
import Input from 'components/Input'

import './style.scss'

const MAX_GET_MEMORY_TIME = 10 * 1000 // in ms
const FAILED_TO_GET_MEMORY = 'Could not get memory from webchatMethods.getMemory :'
const WRONG_MEMORY_FORMAT
  = 'Wrong memory format, expecting : { "memory": <json>, "merge": <boolean> }'

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
  removeAllMessages,
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

  static getDerivedStateFromProps (props, state) {
    const { messages, show } = props

    if (props.getLastMessage && messages && messages !== state.messages && messages.length > 0) {
      props.getLastMessage(messages[messages.length - 1])
    }

    if (messages !== state.messages || show !== state.show) {
      return { messages, show }
    }
    return null
  }

  componentDidMount () {
    const { sendMessagePromise, loadConversationHistoryPromise, conversationHistoryId, show } = this.props

    this._isPolling = false
    if (!sendMessagePromise && show) {
      this.doMessagesPolling()
    }

    if (loadConversationHistoryPromise && conversationHistoryId && show) {
      loadConversationHistoryPromise(conversationHistoryId).then(this.loadConversation)
    }
  }

  componentDidUpdate (prevProps) {
    const { messages, show } = this.state
    const { getLastMessage, removeAllMessages, conversationHistoryId, loadConversationHistoryPromise } = this.props

    if (show && !this.props.sendMessagePromise && !this._isPolling) {
      this.doMessagesPolling()
    }
    if (show && prevProps.conversationHistoryId !== conversationHistoryId && loadConversationHistoryPromise) {
      removeAllMessages()
      loadConversationHistoryPromise(conversationHistoryId).then(this.loadConversation)
    }
  }

  componentWillUnmount () {
    if (this.messagesDelays.length) {
      this.messagesDelays.forEach(messageDelay => clearTimeout(messageDelay))
    }
  }

  messagesDelays = []

  /*
    The window.webchatMethods.getMemory function can return
    a JSON object or a Promise resolving to a JSON object
    Accepted format for the returned object is :
    { memory: arbitrary JSON, merge: boolean }
  */
  getMemoryOptions = chatId => {
    const checkResponseFormat = memoryOptions => {
      if (typeof memoryOptions !== 'object') {
        console.error(WRONG_MEMORY_FORMAT)
        console.error('Got : ')
        console.error(memoryOptions)
        return undefined
      }
      if (!('merge' in memoryOptions) || typeof memoryOptions.merge !== 'boolean') {
        console.error(WRONG_MEMORY_FORMAT)
        console.error('Got : ')
        console.error(memoryOptions)
        return undefined
      }
      if (!('memory' in memoryOptions) || typeof memoryOptions.memory !== 'object') {
        console.error(WRONG_MEMORY_FORMAT)
        console.error('Got : ')
        console.error(memoryOptions)
        return undefined
      }
      return memoryOptions
    }

    return new Promise(resolve => {
      if (!window.webchatMethods || !window.webchatMethods.getMemory) {
        return resolve()
      }
      // so that we send the message in all cases
      setTimeout(resolve, MAX_GET_MEMORY_TIME)
      try {
        const memoryOptionsResponse = window.webchatMethods.getMemory(chatId)
        if (!memoryOptionsResponse) {
          return resolve()
        }
        if (memoryOptionsResponse.then && typeof memoryOptionsResponse.then === 'function') {
          // the function returned a Promise
          memoryOptionsResponse
            .then(memoryOptions => resolve(checkResponseFormat(memoryOptions)))
            .catch(err => {
              console.error(FAILED_TO_GET_MEMORY)
              console.error(err)
              resolve()
            })
        } else {
          resolve(checkResponseFormat(memoryOptionsResponse))
        }
      } catch (err) {
        console.error(FAILED_TO_GET_MEMORY)
        console.error(err)
        resolve()
      }
    })
  }

  shouldHideBotReply = responseData => {
    return (
      responseData.conversation
      && responseData.conversation.skill === 'qna'
      && Array.isArray(responseData.nlp)
      && !responseData.nlp.length
      && Array.isArray(responseData.messages)
      && !responseData.messages.length
    )
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
      defaultMessageDelay,
      readOnlyMode,
    } = this.props
    const payload = { message: { attachment }, chatId }
    if (readOnlyMode) {
      return
    }
    const backendMessage = {
      ...payload.message,
      isSending: true,
      id: `local-${Math.random()}`,
      participant: {
        isBot: false,
      },
    }

    if (userMessage) {
      userMessage = {
        ...JSON.parse(JSON.stringify(backendMessage)),
        attachment: { type: 'text', content: userMessage },
      }
    }

    this.setState(
      prevState => ({ messages: concat(prevState.messages, [backendMessage]) }),
      () => {
        if (sendMessagePromise) {
          addUserMessage(userMessage || backendMessage)

          sendMessagePromise(backendMessage)
            .then(res => {
              if (!res) {
                throw new Error('Fail send message')
              }
              const data = res.data
              const messages
              = data.messages.length === 0
                ? [{ type: 'text', content: 'No reply', error: true }]
                : data.messages
              if (!this.shouldHideBotReply(data)) {
                let delay = 0
                messages.forEach((message, index) => {
                  this.messagesDelays[index] = setTimeout(
                    () =>
                      addBotMessage([message], {
                        ...data,
                        hasDelay: true,
                        hasNextMessage: index !== messages.length - 1,
                      }),
                    delay,
                  )

                  delay
                  += message.delay || message.delay === 0
                      ? message.delay * 1000
                      : defaultMessageDelay === null || defaultMessageDelay === undefined
                        ? 0
                        : defaultMessageDelay * 1000
                })
              }
            })
            .catch(() => {
              addBotMessage([{ type: 'text', content: 'No reply', error: true }])
            })
        } else {
          // get potential memoryOptions from website developer
          this.getMemoryOptions(chatId)
            .then(memoryOptions => {
              if (memoryOptions) {
                payload.memoryOptions = memoryOptions
              }
              return postMessage(channelId, token, payload)
            })
            .then(() => {
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

  loadConversation = res => {
    const { addUserMessage, addBotMessage } = this.props

    this.setState({ messages: [] }, () => {
      res.forEach(item => {
        const data = item.data || {}
        const messages = data.messages || []
        messages.forEach(message => {
          if (item.isBot) {
            addBotMessage([message], { ...data })
          } else {
            const input = {
              id: item.id,
              participant: { isBot: item.isBot },
              attachment: message,
            }
            addUserMessage(input)
          }
        })
      })
    })
  }

  doMessagesPolling = async () => {
    const { conversationId } = this.props
    if (this._isPolling || !conversationId) {
      return
    }
    this._isPolling = true

    let shouldPoll = true
    let index = 0

    do {
      const { lastMessageId, channelId, token } = this.props
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

  render () {
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
      readOnlyMode,
    } = this.props
    const { showSlogan, messages, inputHeight } = this.state

    return (
      <div
        className={cx('RecastAppChat CaiAppChat', { open: show, close: !show })}
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
            key='header'
            logoStyle={logoStyle}
            readOnlyMode={readOnlyMode}
          />
        )}
        <div
          className='RecastAppChat--content CaiAppChat--content'
          style={{
            height: `calc(100% - ${50 + inputHeight}px`,
          }}
          key='content'
        >
          {secondaryView
            ? secondaryContent
            : [
              <Live
                key='live'
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
                key='slogan'
                style={{ maxWidth:'23.0rem' }}
                className={cx('RecastAppChat--slogan CaiAppChat--slogan', {
                  'RecastAppChat--slogan--hidden CaiAppChat--slogan--hidden': !showSlogan,
                })}
              >
                {'We run with SAP Conversational AI'}
              </div>,
            ]}
        </div>
        { !readOnlyMode && <Input
          menu={preferences.menu && preferences.menu.menu}
          isOpen={show}
          onSubmit={this.sendMessage}
          preferences={preferences}
          onInputHeight={height => this.setState({ inputHeight: height })}
          enableHistoryInput={enableHistoryInput}
          inputPlaceholder={propOr('Write a reply', 'userInputPlaceholder', preferences)}
          characterLimit={propOr(0, 'characterLimit', preferences)}
        />
        }
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
  conversationHistoryId: PropTypes.string,
  messages: PropTypes.array,
  preferences: PropTypes.object,
  showInfo: PropTypes.bool,
  sendMessagePromise: PropTypes.func,
  loadConversationHistoryPromise: PropTypes.func,
  primaryHeader: PropTypes.func,
  secondaryView: PropTypes.bool,
  secondaryHeader: PropTypes.any,
  secondaryContent: PropTypes.any,
  getLastMessage: PropTypes.func,
  containerMessagesStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  show: PropTypes.bool,
  enableHistoryInput: PropTypes.bool,
  readOnlyMode: PropTypes.bool,
  defaultMessageDelay: PropTypes.number,
}

export default Chat
