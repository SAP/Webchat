import React from 'react'
import PropTypes from 'prop-types'
import { sanitizeUrl } from '@braintree/sanitize-url'
import cx from 'classnames'

import { truncate } from 'helpers'

import './style.scss'

const Button = ({ button, sendMessage, readOnlyMode }) => {
  const { value, title } = button
  // Increase Button length to 80 characters per SAPMLCONV-3486
  const formattedTitle = truncate(title, 80)
  const tooltip = title && title.length > 80 ? title : null

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
        className={cx('RecastAppButton-Link CaiAppButton-Link', { 'CaiAppButton--ReadOnly': readOnlyMode })}
        href={readOnlyMode ? '#' : telHref}>
        {formattedTitle}
      </a>
    )
    break
  case 'web_url':
    content = (
      <a
        className={cx('RecastAppButton-Link CaiAppButton-Link', { 'CaiAppButton--ReadOnly': readOnlyMode })}
        href={readOnlyMode ? '#' : value}
        target={readOnlyMode ? '_self' : '_blank'}
        rel='noopener noreferrer'>
        {formattedTitle}
      </a>
    )
    break
  default:
    content = (
      <div
        title={tooltip}
        className={cx('RecastAppButton CaiAppButton', { 'CaiAppButton--ReadOnly': readOnlyMode })}
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
  readOnlyMode: PropTypes.bool,
}

export default Button
