import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isBrowserIE } from 'helpers';

import './style.scss'

class Input extends Component {
  state = {
    value: '',
  }

  componentDidMount() {
    this._input.focus()
    this._input.value = isBrowserIE() ? '' : null

    this.onInputHeight()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.value !== this.state.value
  }

  componentDidUpdate() {
    if (!this.state.value) {
      // Dirty fix textarea placeholder to reset style correctly
      setTimeout(() => {
        this._input.style.height = '18px'
        this._input.value = isBrowserIE() ? '' : null
        this.onInputHeight()
      }, 100)
    }

    this.onInputHeight()
  }

  onInputHeight = () => {
    const { onInputHeight } = this.props
    if (onInputHeight) {
      onInputHeight(this.inputContainer.clientHeight)
    }
  }

  sendMessage = () => {
    const content = this.state.value.trim()
    if (content) {
      this.props.onSubmit({ type: 'text', content })
      this.setState({ value: '' })
    }
  }

  autoGrow = () => {
    this._input.style.height = '18px'
    this._input.style.height = this._input.scrollHeight + 'px'
  }

  render() {
    const { value } = this.state

    return (
      <div
        className="RecastAppInput"
        ref={ref => {
          this.inputContainer = ref
        }}
      >
        <textarea
          ref={i => (this._input = i)}
          value={value}
          style={{ width: '100%', maxHeight: 70, resize: 'none' }}
          placeholder={'Write a reply...'}
          onChange={e => this.setState({ value: e.target.value }, this.autoGrow)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              this.sendMessage()
              e.preventDefault()
            }
          }}
          rows={1}
        />
      </div>
    )
  }
}

Input.propTypes = {
  onSubmit: PropTypes.func,
  onInputHeight: PropTypes.func,
}

export default Input
