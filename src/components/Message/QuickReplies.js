import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import sum from 'ramda/es/sum'
import map from 'ramda/es/map'
import values from 'ramda/es/values'
import cx from 'classnames'

import { truncate } from 'helpers'

import Text from './Text'
import { PrevArrow, NextArrow } from 'components/arrows'

class QuickReplies extends Component {
  state = {
    displayQuickReplies: this.props.isLastMessage,
    showArrow: true,
  }

  static getDerivedStateFromProps (props, state) {
    return { displayQuickReplies: props.isLastMessage }
  }

  componentDidMount () {
    const widthQuickReplies = sum(
      values(
        map(button => {
          const dimensions = button.getBoundingClientRect()
          return dimensions.width
        }, this.buttons),
      ),
    )

    if (widthQuickReplies <= 270) {
      this.setState({ showArrow: false }) // eslint-disable-line react/no-did-mount-set-state
    }
  }

   buttons = {}

   _messageHsAlreadyBeenSent = false
  doSendMessage = message => {
    // BCP https://support.wdf.sap.corp/sap/support/message/2070183780
    // Handle double click on slow systems
    // Once the _messageHsAlreadyBeenSent is true,
    // then one button click has already been send.
    if (!this._messageHsAlreadyBeenSent) {
      this._messageHsAlreadyBeenSent = true
      this.setState({ displayQuickReplies: false }, () => {
        this.props.sendMessage(message)
      })
    }
  }

  render () {
    const { content, style, isMarkdown, readOnlyMode } = this.props
    const { displayQuickReplies, showArrow } = this.state
    const { title, buttons } = content

    return (
      <div
        className='RecastAppQuickReplies CaiAppQuickReplies'
        ref={ref => {
          this.container = ref
        }}
      >
        <Text content={title} isMarkdown={isMarkdown} style={style} />

        {displayQuickReplies
          && buttons
          && !!buttons.length && (
          <Slider
            arrows={showArrow}
            variableWidth
            speed={200}
            infinite={false}
            draggable={false}
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
            className='RecastAppSlider RecastAppQuickReplies--slider CaiAppSlider CaiAppQuickReplies--slider'
          >
            {buttons.map((b, i) => (
              <div key={i}>
                <div
                  ref={ref => {
                    this.buttons[i] = ref
                  }}
                  title={b.title.length > 20 ? b.title : null}
                  className={cx('RecastAppQuickReplies--button CaiAppQuickReplies--button', { 'CaiAppQuickReplies--ReadOnly': readOnlyMode })}
                  onClick={() => this.doSendMessage({ type: 'quickReply', content: b })}
                  style={{
                    border: `1px solid ${style.accentColor}`,
                    color: style.accentColor,
                  }}
                >
                  {truncate(b.title, 20)}
                </div>
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
  readOnlyMode: PropTypes.bool,
}

export default QuickReplies
