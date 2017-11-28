import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Text from './Text'

const QuickReplies = ({ content, isBot }) => {
  const { title, buttons } = content
  // TODO
  // display the quick replies
  // DO NOT DISPLAY quick replies if it's not the last message
  return (
    <div className={cx('QuickReplies', { bot: isBot })}>
      <Text content={title} isBot={isBot} />

      <div className='QuickReplies--container'>
        {buttons.map((b, i) => (
          <div
            key={i}
            className='QuickReplies--button'
            onClick={() => console.log(b.value)}
          >
            {b.title}
          </div>
        ))}
      </div>
    </div>
  )
}

QuickReplies.propTypes = {
  content: PropTypes.object,
  isBot: PropTypes.bool,
}

export default QuickReplies
