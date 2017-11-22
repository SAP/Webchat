import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Chat from 'containers/Chat'
import Expander from 'components/Expander'
import { setCredentials, createConversation } from 'actions/conversation'

import './style.scss'

@connect(null, {
  setCredentials,
  createConversation,
})
class App extends Component {

  state = {
    expanded: false,
  }

  componentDidMount () {
    const { channelId, token } = this.props
    this.props.setCredentials({ channelId, token })
    this.props.createConversation(channelId, token)
    // TODO
    // check cookies for existing conversation
    // if there is, try to get the messages for this conversation
    // if not, or if the get messages has failed, create a new conversation
    // and stock it in the cookies
  }

  toggleChat = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const { preferences } = this.props
    const { expanded } = this.state

    return (
      <div className="RecastApp">
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
