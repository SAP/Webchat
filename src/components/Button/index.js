import React from 'react'
import PropTypes from 'prop-types'
import { sanitizeUrl } from '@braintree/sanitize-url'

import { truncate } from 'helpers'

import './style.scss'

const Button = ({ button, sendMessage }) => {
  const { value, title } = button
  // Increase Button length to 80 characters per SAPMLCONV-3486
  const formattedTitle = truncate(title, 80)

  if (button.type === 'web_url' && sanitizeUrl(value) === 'about:blank') {
    return null
  }

  let content = null

  // https://sapjira.wdf.sap.corp/browse/SAPMLCONV-4781 - Support the pnonenumber options
  const telHref = value && value.indexOf('tel:') === 0 ? value : `tel:${value}`
  switch (button.type) {
  case 'phonenumber':
    content = (
      <a
        className='RecastAppButton-Link CaiAppButton-Link' href={telHref}>
        {formattedTitle}
      </a>
    )
    break
  case 'web_url':
    content = (
      <a
        className='RecastAppButton-Link CaiAppButton-Link' href={value} target='_blank'
        rel='noopener noreferrer'>
        {formattedTitle}
      </a>
    )
    break
  default:
    content = (
      <div
        className='RecastAppButton CaiAppButton'
        onClick={() => sendMessage({ type: 'button', content: button }, title)}
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
