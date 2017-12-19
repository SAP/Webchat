import React from 'react'
import PropTypes from 'prop-types'

import { truncate } from 'helpers'

import './style.scss'

const Button = ({ button, sendMessage }) => {
  const { value, title } = button
  const formattedTitle = truncate(title, 20)

  let content = null

  switch (button.type) {
    case 'web_url':
      content = (
        <a className="Button-Link" href={value} target="_blank">
          {formattedTitle}
        </a>
      )
      break
    default:
      content = (
        <div className="Button" onClick={() => sendMessage({ type: 'text', content: value })}>
          {formattedTitle}
        </div>
      )
      break
  }

  return content
}

Button.propTypes = {
  button: PropTypes.object,
  sendMessage: PropTypes.func,
}

export default Button
