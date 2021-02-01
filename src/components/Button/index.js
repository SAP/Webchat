import React from 'react'
import PropTypes from 'prop-types'
import { sanitizeUrl } from '@braintree/sanitize-url'
import cx from 'classnames'

import { truncate, validButtonContent } from 'helpers'

import './style.scss'

const _getValidTelHref = (button, readOnlyMode) => {
  const { value } = button
  if (!readOnlyMode && value) {
    return value.indexOf('tel:') === 0 ? value : `tel:${value}`
  }
  return '#'
}

const _getUrlInfo = (button, readOnlyMode) => {
  const { value } = button
  const target = readOnlyMode ? '_self' : '_blank'
  const href = readOnlyMode || !value ? '#' : value
  return {
    target,
    href,
  }
}

const Button = ({ button, sendMessage, readOnlyMode, isLastMessage }) => {
  if (!button) {
    return null
  }
  const { value, title, type } = button
  // Increase Button length to 80 characters per SAPMLCONV-3486
  const formattedTitle = truncate(title, 80)
  const tooltip = title && title.length > 80 ? title : null
  const disableButton = readOnlyMode || (!isLastMessage && type === 'trigger_skill')
  if (button.type === 'web_url' && sanitizeUrl(value) === 'about:blank') {
    return null
  }

  let content = null

  // https://sapjira.wdf.sap.corp/browse/SAPMLCONV-4781 - Support the phonenumber options
  const linkClassName = cx('RecastAppButton-Link CaiAppButton-Link', { 'CaiAppButton--ReadOnly': disableButton })
  const { href, target } = _getUrlInfo(button, disableButton)
  const bData = validButtonContent(button)
  switch (type) {
  case 'phonenumber':
    content = (
      <a
        className={linkClassName}
        href={_getValidTelHref(button, disableButton)}>
        {formattedTitle}
      </a>
    )
    break
  case 'web_url':
    content = (
      <a
        className={linkClassName}
        href={href}
        target={target}
        rel='noopener noreferrer'>
        {formattedTitle}
      </a>
    )
    break
  default:
    content = (
      <div
        title={tooltip}
        className={cx('RecastAppButton CaiAppButton', { 'CaiAppButton--ReadOnly': disableButton })}
        onClick={() => {
          // eslint-disable-next-line no-unused-expressions
          !disableButton && sendMessage({ type: 'button', content: bData }, title)
        }}
      >
        {formattedTitle}
      </div>
    )
    break
  }

  return content
}

Button.propTypes = {
  isLastMessage: PropTypes.bool,
  button: PropTypes.object,
  sendMessage: PropTypes.func,
  readOnlyMode: PropTypes.bool,
}

export default Button
