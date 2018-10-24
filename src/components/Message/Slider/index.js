import React, { Component } from 'react'
import { PrevArrow, NextArrow } from '../../arrows'

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
      this.setState({ canNext: true })
    }
  }

  onClickPrevious = () => {
    this.setState(prevState => {
      const previousItem = this.items[prevState.index - 1].getBoundingClientRect()

      return {
        canPrevious: prevState.index - 1 > 0, // TODO
        canNext: true, // TODO
        translateWidth: Math.min(prevState.translateWidth + previousItem.width, 0),
        index: prevState.index - 1,
      }
    })
  }

  onClickNext = () => {
    const { children } = this.props
    const { width: maxWidth } = this.content.getBoundingClientRect()

    this.setState(prevState => {
      const previousItem = this.items[prevState.index].getBoundingClientRect()

      const shouldUpdate =
        Math.max(
          prevState.translateWidth - previousItem.width,
          -maxWidth + this.container.getBoundingClientRect().width,
        ) !== prevState.translateWidth

      if (!shouldUpdate) {
        return {
          canNext: false,
        }
      }

      return {
        canNext: true, // TODO
        canPrevious: true, // TODO
        translateWidth: Math.max(
          prevState.translateWidth - previousItem.width,
          -maxWidth + this.container.getBoundingClientRect().width,
        ),
        index: prevState.index + 1 < children.length ? prevState.index + 1 : prevState.index,
      }
    })
  }

  render() {
    const { children } = this.props
    const { index, translateWidth, canNext, canPrevious } = this.state

    return (
      <div
        className="Slider"
        ref={ref => {
          this.container = ref
        }}
      >
        {canPrevious && (
          <div className="arrow left" onClick={this.onClickPrevious}>
            <PrevArrow />
          </div>
        )}
        {canNext && (
          <div className="arrow right" onClick={this.onClickNext}>
            <NextArrow />
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
            React.cloneElement(child, { ref: ref => (this.items[index] = ref) }),
          )}
        </div>
      </div>
    )
  }
}

export default Slider
