import React from 'react'
import PropTypes from 'prop-types'
import sanitizeHtml from 'sanitize-html-react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

import cx from 'classnames'

import { truncate, safeStringValue } from 'helpers'

import './style.scss'

const allowedMarkdownTypes = [
  'paragraph',
  'text',
  'break',
  'emphasis',
  'strong',
  'link',
  'image',
  'blockquote',
  'delete',
  'list',
  'listItem',
  'heading',
  'code',
  'thematicBreak',
  'table',
  'tableHead',
  'tableBody',
  'tableRow',
  'tableCell',
]

const Text = ({ content, style, isMarkdown, readOnlyMode }) => {
  const respond = safeStringValue(content)

  if (typeof isMarkdown !== 'boolean') {
    isMarkdown = false
  }

  let maxLengthLimit = 640
  // JIRA: https://sapjira.wdf.sap.corp/browse/SAPMLCONV-4904
  if (isMarkdown) {
    // Remove markdown tags and replace [Link Name Text](http:url...) with 'Link Name Text' only.
    const displayText = respond.replace(/__|\*|#|(?:\[([^\]]*)\]\([^)]*\))/gm, '$1')
    // Increase the max length limit to include any markdown (links) strings, to avoid losing the href strings.
    maxLengthLimit += Math.max(respond.length - displayText.length, 0)
  }

  const compiledResponse = sanitizeHtml(truncate(respond, maxLengthLimit), {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
  })
    .replace(/&amp;/g, 'g')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

  // Markdown links need to open in new window.
  // BCP: https://support.wdf.sap.corp/sap/support/message/1980408289
  const LinkRenderer = (props) => {
    return (
      <a
        className={cx({ 'CaiAppButton--ReadOnly': readOnlyMode })}
        href={readOnlyMode ? '#' : props.href}
        target={readOnlyMode ? '_self' : '_blank'}
        rel='noopener noreferrer'>{props.children}
      </a>)
  }
  // Due to a bug in the markdown need to escape the // in the text part of a link
  // Example of issue in markdown [https://foo](https://foo) doesn't work,
  // but [https:\/\/foo](https://foo) seems to fix the issue
  // BCP: https://support.wdf.sap.corp/sap/support/message/2180153653
  let markDownResponse = isMarkdown ? compiledResponse : null

  // Search the text starting with [ with :// and ends with ]
  const regex = /(?<=\[)(.*?)(:\/\/)(.*)(?=\])/gm
  if (markDownResponse && markDownResponse.match(regex)) {
    markDownResponse = markDownResponse.replace(regex, '$1:\\/\\/$3')
  }
  return (
    <div style={style} className={'RecastAppText CaiAppText'}>
      {isMarkdown ? (
        <ReactMarkdown
          plugins={[gfm]}
          renderers={{ link: LinkRenderer }}
          allowedTypes={allowedMarkdownTypes}>{markDownResponse}
        </ReactMarkdown>
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
  readOnlyMode: PropTypes.bool,
}

export default Text
