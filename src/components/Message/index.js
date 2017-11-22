import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Message extends Component {

  render () {
    const { message } = this.props

    return (
      <div>
        {'A message'}
      </div>
    )
  }
}

Message.propTypes = {
  message: PropTypes.object,
}

export default Message
