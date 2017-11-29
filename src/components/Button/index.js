import React from 'react'
import PropTypes from 'prop-types'

import { truncate } from 'helpers'

import './style.scss'

const Button = ({ button, sendMessage }) => {
  const { value, title } = button

  return (
    <div
      className='Button'
      onClick={() => sendMessage({ type: 'text', content: value })}
    >
      {truncate(title, 20)}
    </div>
  )
}

Button.propTypes = {
  button: PropTypes.object,
  sendMessage: PropTypes.func,
}

export default Button
