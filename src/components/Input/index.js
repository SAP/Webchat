import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss'

class Input extends Component {
  state = {
    value: '',
  }

  componentDidMount() {
    this._input.focus()
  }

  sendMessage = e => {
    const content = this.state.value.trim()

    e.preventDefault()
    if (content) {
      this.props.onSubmit({ type: 'text', content })
      this.setState({ value: '' })
    }
  }

  render() {
    const { value } = this.state

    return (
      <div className="RecastAppInput">
        <form onSubmit={this.sendMessage}>
          <input
            ref={i => (this._input = i)}
            type="text"
            value={value}
            style={{ width: '100%' }}
            placeholder={'Write a reply...'}
            onChange={e => this.setState({ value: e.target.value })}
          />
        </form>
      </div>
    )
  }
}

Input.propTypes = {
  onSubmit: PropTypes.func,
}

export default Input
