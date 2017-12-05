import React from 'react'
import PropTypes from 'prop-types'
import sanitizeHtml from 'sanitize-html'

import { truncate } from 'helpers'

import './style.scss'

const Text = ({ content, style }) => {
  return (
    <div
      style={style}
      className={'Text'}
    >
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
  style: PropTypes.object,
  content: PropTypes.string,
}

export default Text

