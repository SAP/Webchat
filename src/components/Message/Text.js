import React from 'react'
import PropTypes from 'prop-types'
import sanitizeHtml from 'sanitize-html-react'

import { truncate } from 'helpers'

import './style.scss'

const Text = ({ content, style }) => {
  let respond

  if (typeof content === 'string') {
    respond = content
  } else if (typeof content === 'object') {
    respond = JSON.stringify(content)
  } else if (typeof content === 'number') {
    respond = content.toString()
  } else if (content === undefined) {
    respond = 'undefined'
  } else {
    respond = ''
  }

  return (
    <div style={style} className={'RecastAppText CaiAppText'}>
      {sanitizeHtml(truncate(respond, 640), {
        allowedTags: ['b', 'i', 'em', 'strong', 'a'],
      })
        .replace(/&amp;/g, 'g')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')}
    </div>
  )
}

Text.propTypes = {
  style: PropTypes.object,
  content: PropTypes.string,
}

export default Text
