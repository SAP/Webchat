import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Chat from 'containers/Chat'
import Expander from 'components/Expander'
import { setFirstMessage, removeAllMessages } from 'actions/messages'
import { setCredentials, createConversation } from 'actions/conversation'
import { storeCredentialsToLocalStorage, getCredentialsFromLocalStorage } from 'helpers'

import './style.scss'

const NO_LOCALSTORAGE_MESSAGE
  = 'Sorry, your browser does not support web storage. Are you in localhost ?'

@connect(
  state => ({
    isReady: state.conversation.conversationId,
    }),
  {
  setCredentials,
  setFirstMessage,
  createConversation,
  removeAllMessages,
  },
)
class App extends Component {
  state = {
    expanded: this.props.expanded || false,
    isReady: null,
  }
  static getDerivedStateFromProps (props, state) {
    const { isReady, preferences } = props
    const { expanded } = state
    if (isReady !== state.isReady) {
      let expanded = null

      switch (preferences.openingType) {
      case 'always':
        expanded = true
        break
      case 'never':
        expanded = false
        break
      case 'memory':
        if (typeof window.localStorage !== 'undefined') {
          expanded = localStorage.getItem('isChatOpen') === 'true'
        } else {
          console.log(NO_LOCALSTORAGE_MESSAGE)
        }
        break
      default:
        break
      }
      return { expanded, isReady }
    }

    if (expanded !== undefined && expanded !== state.expanded) {
      return { expanded }
    }
    return null
  }

  componentDidMount () {
    const { channelId, token, preferences, noCredentials, onRef } = this.props
    const credentials = getCredentialsFromLocalStorage()
    const payload = { channelId, token }

    if (onRef) {
      onRef(this)
    }

    if (noCredentials) {
      return false
    }

    if (credentials) {
      Object.assign(payload, credentials)
    } else {
      this.props.createConversation(channelId, token).then(({ id, chatId }) => {
        storeCredentialsToLocalStorage(chatId, id, preferences.conversationTimeToLive)
      })
    }

    if (preferences.welcomeMessage) {
      this.props.setFirstMessage(preferences.welcomeMessage)
    }

    this.props.setCredentials(payload)
  }

  componentDidUpdate (prevState) {
    const { onToggle } = this.props

    if (prevState.expanded !== this.state.expanded) {
      if (typeof window.localStorage !== 'undefined') {
        localStorage.setItem('isChatOpen', this.state.expanded)
        if (onToggle) {
          onToggle(this.state.expanded)
        }
      } else {
        console.log(NO_LOCALSTORAGE_MESSAGE)
      }
    }
  }

  componentDidCatch (error, info) {
    console.log(error, info)
  }

  toggleChat = () => {
    const { clearMessagesOnclose } = this.props
    this.setState({ expanded: !this.state.expanded }, () => {
      if (!this.state.expanded && clearMessagesOnclose) {
        this.clearMessages()
      }
    })
  }

  clearMessages = () => {
    this.props.removeAllMessages()
  }

  render () {
    const {
      preferences,
      containerMessagesStyle,
      containerStyle,
      expanderStyle,
      logoStyle,
      showInfo,
      sendMessagePromise,
      onClickShowInfo,
      primaryHeader,
      secondaryView,
      secondaryHeader,
      secondaryContent,
      getLastMessage,
      enableHistoryInput,
      defaultMessageDelay,
    } = this.props
    const { expanded } = this.state

    return (
      <div className='RecastApp CaiApp'>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
        />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
        />

        <Expander
          show={!expanded}
          onClick={this.toggleChat}
          preferences={preferences}
          style={expanderStyle}
        />

        <Chat
          show={expanded}
          closeWebchat={this.toggleChat}
          preferences={preferences}
          containerMessagesStyle={containerMessagesStyle}
          containerStyle={containerStyle}
          logoStyle={logoStyle}
          showInfo={showInfo}
          onClickShowInfo={onClickShowInfo}
          sendMessagePromise={sendMessagePromise}
          primaryHeader={primaryHeader}
          secondaryView={secondaryView}
          secondaryHeader={secondaryHeader}
          secondaryContent={secondaryContent}
          getLastMessage={getLastMessage}
          enableHistoryInput={enableHistoryInput}
          defaultMessageDelay={defaultMessageDelay}
        />
      </div>
    )
  }
}

App.propTypes = {
  token: PropTypes.string,
  channelId: PropTypes.string,
  preferences: PropTypes.object.isRequired,
  containerMessagesStyle: PropTypes.object,
  expanderStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  showInfo: PropTypes.bool,
  sendMessagePromise: PropTypes.func,
  noCredentials: PropTypes.bool,
  primaryHeader: PropTypes.func,
  secondaryView: PropTypes.bool,
  secondaryHeader: PropTypes.any,
  secondaryContent: PropTypes.any,
  getLastMessage: PropTypes.func,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  removeAllMessages: PropTypes.func,
  onRef: PropTypes.func,
  clearMessagesOnclose: PropTypes.bool,
  enableHistoryInput: PropTypes.bool,
  defaultMessageDelay: PropTypes.number,
}

export default App
