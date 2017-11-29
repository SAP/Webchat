import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import sanitizeHtml from 'sanitize-html'

import { truncate } from 'helpers'

import './style.scss'

const Text = ({ content, isBot }) => {
  return (
    <div className={cx('Text', { bot: isBot })}>
      {
        sanitizeHtml(truncate(content, 640))
          .replace(/&amp;/g, 'g')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
      }
    </div>
  )
}

Text.propTypes = {
  isBot: PropTypes.bool,
  content: PropTypes.string,
}

export default Text

