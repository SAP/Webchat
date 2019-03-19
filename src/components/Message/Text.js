import React from 'react'
import PropTypes from 'prop-types'
import sanitizeHtml from 'sanitize-html-react'
import ReactMarkdown from 'react-markdown'

import { truncate } from 'helpers'

import './style.scss'

const Text = ({ content, style, isMarkdown }) => {
  let respond

  if (typeof isMarkdown !== 'boolean') {
    isMarkdown = false
  }

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

  const compiledResponse = sanitizeHtml(truncate(respond, 640), {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
  })
    .replace(/&amp;/g, 'g')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

  return (
    <div style={style} className={'RecastAppText CaiAppText'}>
      {isMarkdown ? (
        <ReactMarkdown
          source={compiledResponse}
          allowedTypes={['paragraph', 'text', 'emphasis', 'strong', 'link']}
        />
      ) : (
        compiledResponse
      )}
    </div>
  )
}

Text.propTypes = {
  style: PropTypes.object,
  content: PropTypes.string,
  isMarkdown: PropTypes.bool,
}

export default Text
