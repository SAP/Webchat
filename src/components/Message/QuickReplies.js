import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Slider from 'react-slick'

import Text from './Text'

function SamplePrevArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      style={{
        ...style,
        background: 'white',
        left: 0,
        zIndex: 2,
        display: 'flex',
      }}
      onClick={onClick}
    />
  )
}

function SampleNextArrow(props) {
  const {className, style, onClick} = props
  return (
    <div
      className={className}
      style={{
        ...style,
        background: 'white',
        right: 0,
        zIndex: 2,
        display: 'flex',
      }}
      onClick={onClick}
    />
  )
}

const QuickReplies = ({ content, isBot, sendMessage, isLastMessage }) => {
  const { title, buttons } = content

  return (
    <div className={cx('QuickReplies', { bot: isBot })}>
      <Text content={title} isBot={isBot} />

      {isLastMessage && (
        <Slider
          className='QuickReplies--slider'
          arrows
          infinite
          variableWidth
          speed={300}
          draggable={false}
          slidesToScroll={2}
          prevArrow={<SamplePrevArrow />}
          nextArrow={<SampleNextArrow />}
        >
          {buttons.map((b, i) => (
            <div
              key={i}
              className='QuickReplies--button'
              onClick={() => sendMessage({ type: 'text', content: b.value })}
            >
              {b.title}
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}

QuickReplies.propTypes = {
  content: PropTypes.object,
  isBot: PropTypes.bool,
  sendMessage: PropTypes.func,
}

export default QuickReplies
