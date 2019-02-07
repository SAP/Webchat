import React from 'react'
import PropTypes from 'prop-types'
import sanitizeHtml from 'sanitize-html-react'
import ReactMarkdown from 'react-markdown';

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
  const compiledRespond = sanitizeHtml(truncate(respond, 640), {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
  })
    .replace(/&amp;/g, 'g')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
  return (
    <div style={style} className={'RecastAppText CaiAppText'}>
      <ReactMarkdown
        source={compiledRespond}
        allowedTypes={['paragraph', 'text', 'emphasis', 'strong', 'link']}
      />
    </div>
  )
}

Text.propTypes = {
  style: PropTypes.object,
  content: PropTypes.string,
}

export default Text
