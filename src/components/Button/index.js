import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

// TODO
// title: 20 chars max

const Button = ({ button, sendMessage }) => {
  const { value, title } = button

  return (
    <div
      className='Button'
      onClick={() => sendMessage({ type: 'text', content: value })}
    >
      {title}
    </div>
  )
}

Button.propTypes = {
  button: PropTypes.object,
  sendMessage: PropTypes.func,
}

export default Button
