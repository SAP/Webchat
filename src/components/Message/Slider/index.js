import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss'

class Slider extends Component {
  state = {
    index: 0,
    translateWidth: 0,
    canPrevious: false,
    canNext: true,
  }

  items = {}

  componentDidMount() {
    if (this.content.getBoundingClientRect().width > this.container.getBoundingClientRect().width) {
      this.setState({ canNext: true }) // eslint-disable-line react/no-did-mount-set-state
    }
  }

  onClickPrevious = () => {
    this.setState(prevState => {
      const previousItem = this.items[prevState.index - 1].getBoundingClientRect()

      return {
        canPrevious: prevState.index - 1 > 0,
        canNext: prevState.index - 1 <= 0,
        translateWidth: Math.min(prevState.translateWidth + previousItem.width, 0),
        index: Math.max(prevState.index - 1, 0),
      }
    })
  }

  onClickNext = () => {
    const { children } = this.props
    const { index } = this.state
    const { width: maxWidth } = this.content.getBoundingClientRect()
    const previousItem = this.items[index].getBoundingClientRect()
    const containerWidth = this.container.getBoundingClientRect().width

    if (this.hasMaxElementsDisplayed()) {
      return
    }

    this.setState(
      prevState => {
        return {
          canNext: true,
          canPrevious: prevState.index + 1 > 0,
          translateWidth: Math.max(
            prevState.translateWidth - previousItem.width,
            -maxWidth + containerWidth,
          ),
          index: Math.min(prevState.index + 1, children.length - 1),
        }
      },
      () => this.setState({ canNext: !this.hasMaxElementsDisplayed() }),
    )
  }

  hasMaxElementsDisplayed = () => {
    const { index, translateWidth } = this.state
    const { width: maxWidth } = this.content.getBoundingClientRect()
    const previousItem = this.items[index].getBoundingClientRect()
    const containerWidth = this.container.getBoundingClientRect().width
    return (
      Math.max(translateWidth - previousItem.width, -maxWidth + containerWidth) >= translateWidth
    )
  }

  render() {
    const { children, prevArrow, nextArrow, arrows } = this.props
    const { translateWidth, canNext, canPrevious } = this.state

    return (
      <div
        className="Slider"
        ref={ref => {
          this.container = ref
        }}
      >
        {canPrevious &&
          arrows && (
            <div className="arrow left" onClick={this.onClickPrevious}>
              {prevArrow}
            </div>
          )}
        {canNext &&
          arrows && (
            <div className="arrow right" onClick={this.onClickNext}>
              {nextArrow}
            </div>
          )}
        <div
          className="content"
          style={{ transform: `translateX(${translateWidth}px)` }}
          ref={ref => {
            this.content = ref
          }}
        >
          {React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
              ref: ref => (this.items[index] = ref),
              style: { ...child.props.style, padding: 5 },
            }),
          )}
        </div>
      </div>
    )
  }
}

Slider.propTypes = {
  arrows: PropTypes.bool,
  prevArrow: PropTypes.any,
  nextArrow: PropTypes.any,
}

export default Slider
