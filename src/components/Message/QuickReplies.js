import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

import { truncate } from 'helpers'

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
    const { content, style } = this.props
    const { displayQuickReplies } = this.state
    const { title, buttons } = content

    return (
      <div className={'QuickReplies'}>
        <Text content={title} style={style} />

        {displayQuickReplies && (
          <Slider
            arrows
            variableWidth
            speed={200}
            infinite={false}
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
                style={{ border: `1px solid ${style.backgroundColor}`, color: style.backgroundColor }}
              >
                {truncate(b.title, 20)}
              </div>
            ))}
          </Slider>
        )}
      </div>
    )
  }
}

QuickReplies.propTypes = {
  style: PropTypes.object,
  content: PropTypes.object,
  sendMessage: PropTypes.func,
}

export default QuickReplies
