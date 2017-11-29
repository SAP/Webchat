import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Slider from 'react-slick'

import Text from './Text'
import { PrevArrow, NextArrow } from 'components/arrows'

class QuickReplies extends Component {

  state = {
    displayQuickReplies: this.props.isLastMessage,
  }

  doSendMessage = (message) => {
    this.props.sendMessage(message)
    this.setState({ displayQuickReplies: false })
  }

  render () {
    const { content, isBot } = this.props
    const { displayQuickReplies } = this.state
    const { title, buttons } = content

    return (
      <div className={cx('QuickReplies', { bot: isBot })}>
        <Text content={title} isBot={isBot} />

        {displayQuickReplies && (
          <Slider
            arrows
            infinite
            variableWidth
            speed={200}
            draggable={false}
            slidesToScroll={2}
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
            className='Slider QuickReplies--slider'
          >
            {buttons.map((b, i) => (
              <div
                key={i}
                className='QuickReplies--button'
                onClick={() => this.doSendMessage({ type: 'text', content: b.value })}
              >
                {b.title}
              </div>
            ))}
          </Slider>
        )}
      </div>
    )
  }
}

QuickReplies.propTypes = {
  content: PropTypes.object,
  isBot: PropTypes.bool,
  sendMessage: PropTypes.func,
}

export default QuickReplies
