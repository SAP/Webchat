import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Message from 'components/Message'

import './style.scss'

class Live extends Component {

  render () {
    const { messages } = this.props

    return (
      <div className='Live'>
        {messages.map(message => (
          <Message
            key={message.id}
            message={message}
          />
        ))}
      </div>
    )
  }

}

Live.propTypes = {
  messages: PropTypes.array,
}

export default Live
