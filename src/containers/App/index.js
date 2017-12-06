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
    const { channelId, token, preferences } = this.props
    const credentials = getCredentialsFromCookie()
    const payload = { channelId, token }

    if (credentials) {
      Object.assign(payload, credentials)
    } else {
      this.props
        .createConversation(channelId, token)
        .then(({ id, chatId }) =>
          storeCredentialsInCookie(chatId, id, preferences.conversationTimeToLive),
        )
    }

    this.props.setCredentials(payload)
  }

  toggleChat = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const { preferences } = this.props
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

        {!expanded && <Expander onClick={this.toggleChat} preferences={preferences} />}

        {expanded && <Chat closeWebchat={this.toggleChat} preferences={preferences} />}
      </div>
    )
  }
}

App.propTypes = {
  token: PropTypes.string.isRequired,
  channelId: PropTypes.string.isRequired,
  preferences: PropTypes.object.isRequired,
}

export default App
