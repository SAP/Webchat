import React from 'react'
import PropTypes from 'prop-types'
import validURL from 'valid-url'

import { truncate } from 'helpers'

import './style.scss'

const Button = ({ button, sendMessage }) => {
  const { value, title } = button
  const formattedTitle = truncate(title, 20)

  if (button.type === 'web_url' && (!validURL.isUri(value) || !validURL.isWebUri(value))) {
    return null
  }

  let content = null

  switch (button.type) {
    case 'web_url':
      content = (
        <a className="RecastAppButton-Link" href={value} target="_blank">
          {formattedTitle}
        </a>
      )
      break
    default:
      content = (
        <div
          className="RecastAppButton"
          onClick={() => sendMessage({ type: 'button', content: button })}
        >
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
