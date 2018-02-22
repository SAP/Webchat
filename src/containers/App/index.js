import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Chat from 'containers/Chat'
import Expander from 'components/Expander'
import { setCredentials, createConversation } from 'actions/conversation'
import { storeCredentialsInCookie, getCredentialsFromCookie } from 'helpers'

import './style.scss'

@connect(null, {
  setCredentials,
  createConversation,
})
class App extends Component {
  state = {
    expanded: false,
  }

  componentDidMount() {
    const { channelId, token, preferences, noCredentials } = this.props
    const credentials = getCredentialsFromCookie()
    const payload = { channelId, token }

    if (noCredentials) {
      return false
    }

    if (credentials) {
      Object.assign(payload, credentials)
    } else {
      this.props.createConversation(channelId, token).then(({ id, chatId }) => {
        storeCredentialsInCookie(chatId, id, preferences.conversationTimeToLive)
      })
    }

    this.props.setCredentials(payload)
  }

  toggleChat = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const {
      preferences,
      containerMessagesStyle,
      expanderStyle,
      showInfo,
      sendMessagePromise,
      onClickShowInfo,
      secondaryView,
      secondaryHeader,
      secondaryContent,
      getLastMessage,
    } = this.props
    const { expanded } = this.state

    return (
      <div className="RecastApp">
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />

        {!expanded && <Expander onClick={this.toggleChat} preferences={preferences} style={expanderStyle} />}

        {expanded && (
          <Chat
            closeWebchat={this.toggleChat}
            preferences={preferences}
            containerMessagesStyle={containerMessagesStyle}
            showInfo={showInfo}
            onClickShowInfo={onClickShowInfo}
            sendMessagePromise={sendMessagePromise}
            secondaryView={secondaryView}
            secondaryHeader={secondaryHeader}
            secondaryContent={secondaryContent}
            getLastMessage={getLastMessage}
          />
        )}
      </div>
    )
  }
}

App.propTypes = {
  token: PropTypes.string.isRequired,
  channelId: PropTypes.string.isRequired,
  preferences: PropTypes.object.isRequired,
  containerMessagesStyle: PropTypes.object,
  expanderStyle: PropTypes.object,
  showInfo: PropTypes.bool,
  sendMessagePromise: PropTypes.object,
  noCredentials: PropTypes.bool,
  secondaryView: PropTypes.bool,
  secondaryHeader: PropTypes.any,
  secondaryContent: PropTypes.any,
  getLastMessage: PropTypes.func,
}

export default App
