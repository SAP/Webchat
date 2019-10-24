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
    chatLocationSticky: 'default',
    chatDirectionOpen: 'default'
  }

  componentDidMount () {
    const { channelId, token, preferences, noCredentials, onRef } = this.props
    const credentials = getCredentialsFromLocalStorage(channelId)
    const payload = { channelId, token }
    preferences.chatLocationSticky =  this.state.chatLocationSticky;
    preferences.chatDirectionOpen = this.state.chatDirectionOpen;
    this.forceUpdate();

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
        storeCredentialsToLocalStorage(chatId, id, preferences.conversationTimeToLive, channelId)
      })
    }

    if (preferences.welcomeMessage) {
      this.props.setFirstMessage(preferences.welcomeMessage)
    }

    this.props.setCredentials(payload)
  }

  componentWillReceiveProps (nextProps) {
    const { isReady, preferences, expanded } = nextProps
    if (isReady !== this.props.isReady) {
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
      this.setState({ expanded })
    }

    if (expanded !== undefined && expanded !== this.state.expanded) {
      this.setState({ expanded })
    }
  }

  componentDidUpdate (prevState) {
    const { onToggle, preferences } = this.props

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

    preferences.chatLocationSticky =  this.state.chatLocationSticky;
    preferences.chatDirectionOpen = this.state.chatDirectionOpen;
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

  /*TODO remove for HACKTOBER DEMO purpose */
  handleChangeLocation = (event) => {
    this.setState(
      {chatLocationSticky: event.target.value}, () => {
        this.forceUpdate();
      });
  }
  
  handleChangeDirection = (event) => {
    this.setState(
      {chatDirectionOpen: event.target.value}, () => {
      this.forceUpdate();
    });
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
    const {chatDirectionOpen, chatLocationSticky } = this.state

    return (
      <div className='RecastApp CaiApp'>
        <div className="HacktoberDemo">
          <div style={{marginBottom: '20px', display: 'inline-block', width: '100%'}}>
            <strong>LOCATION </strong>
            <label for="defaultLoc">
              <input
                onChange={this.handleChangeLocation}
                type="radio"
                id="defaultLoc"
                name="location"
                value="default"
                checked={chatLocationSticky === "default"} />
              &nbsp;Default (Right)&nbsp;&nbsp;
            </label>
            <label for="leftLoc">
              <input
                onChange={this.handleChangeLocation}
                type="radio"
                id="leftLoc"
                name="location"
                value="chatLocationStickyLeft"
                checked={chatLocationSticky === "chatLocationStickyLeft"} />
              &nbsp;Left
            </label>
          </div>
          <div style={{marginBottom: '10px', display: 'inline-block', width: '100%'}}>
            <strong>DIRECTION </strong>
            <label for="bottom">
              <input onChange={this.handleChangeDirection}
                type="radio"
                id="bottom"
                name="direction"
                value="default"
                checked={chatDirectionOpen === "default"} />
              &nbsp;Default (bottom to top)&nbsp;&nbsp;
            </label>
            <label for="right">
              <input onChange={this.handleChangeDirection}
                type="radio"
                id="right"
                name="direction"
                value="chatDirectionRightLeft"
                checked={chatDirectionOpen === "chatDirectionRightLeft"} />
              &nbsp;Open right to left&nbsp;&nbsp;
            </label>
            <label for="left">
              <input
                onChange={this.handleChangeDirection}
                type="radio"
                id="left"
                name="direction"
                value="chatDirectionLeftRight"
                checked={chatDirectionOpen === "chatDirectionLeftRight"} />
              &nbsp;from left to right
            </label>
          </div>
        </div>
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
