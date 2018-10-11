import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import './style.scss'

// Number of minimum char to display the char limit.
const NUMBER_BEFORE_LIMIT = 5

class Input extends Component {
  state = {
    value: '',
    previousValues: [],
    historyValues: [],
    indexHistory: 0,
  }

  componentDidMount() {
    this._input.focus()
    this._input.value = ''

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
        this._input.value = ''
        this.onInputHeight()
      }, 100)
    }

    this.onInputHeight()
  }

  onInputChange = e => {
    e.persist()

    const { characterLimit } = this.props
    const { value } = e.target

    if (characterLimit && value.length > characterLimit) {
      return
    }

    this.setState(prevState => {
      const newPreviousValues = [...prevState.previousValues]
      newPreviousValues[prevState.indexHistory] = value
      return {
        value: e.target.value,
        previousValues: newPreviousValues,
      }
    }, this.autoGrow)
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
      this.setState(prevState => {
        const historyValues = R.append(content, prevState.historyValues)
        const previousValues = R.append('', historyValues)

        return {
          value: '',
          previousValues,
          historyValues,
          indexHistory: previousValues.length - 1,
        }
      })
    }
  }

  autoGrow = () => {
    this._input.style.height = '18px'
    this._input.style.height = this._input.scrollHeight + 'px'
  }

  handleKeyboard = keyName => {
    const { indexHistory, previousValues } = this.state
    if (keyName === 'ArrowUp') {
      if (indexHistory > -1) {
        this.setState(
          prevState => {
            const indexHistory = Math.max(prevState.indexHistory - 1, 0)
            return {
              indexHistory,
              value: prevState.previousValues[indexHistory],
            }
          },
          () => {
            // Trick to go to the end of the line when pressing ArrowUp key
            setTimeout(() => {
              this._input.selectionStart = this._input.value.length
              this._input.selectionEnd = this._input.value.length
            }, 10)
          },
        )
      }
    } else if (keyName === 'ArrowDown') {
      if (indexHistory < previousValues.length - 1) {
        this.setState(prevState => {
          const indexHistory = Math.min(
            prevState.indexHistory + 1,
            Math.max(prevState.previousValues.length - 1, 0),
          )
          return {
            indexHistory,
            value: prevState.previousValues[indexHistory],
          }
        })
      } else {
        this.setState({
          value: '',
        })
      }
    }
  }

  render() {
    const { enableHistoryInput, characterLimit, inputPlaceholder } = this.props
    const { value } = this.state

    const showLimitCharacter = characterLimit
      ? characterLimit - value.length <= NUMBER_BEFORE_LIMIT
      : null

    return (
      <div
        className="RecastAppInput"
        ref={ref => {
          this.inputContainer = ref
        }}
        style = {
          {
            display: 'flex',
            alignItems: 'center'
          }
        }
      >
        <textarea
          ref={i => (this._input = i)}
          value={value}
          style={{ width: '80%', maxHeight: 70, resize: 'none' }}
          placeholder={inputPlaceholder}
          onChange={this.onInputChange}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              this.sendMessage()
              e.preventDefault()
            }
          }}
          onKeyDown={event => {
            if (enableHistoryInput) {
              this.handleKeyboard(event.key)
            }
          }}
          rows={1}
          />
        <div
          style = {
            {
              display: 'flex',
            }
          }
        >
          <button
            onClick = {
              this.sendMessage
            }
            disabled = {
              !value
            }
            style = {
              {
                paddingLeft: 40,
              }
            }
          >
            <svg
              style = {
                {
                  width: 40,
                  fill: value ? '#00008F' : '#CCC'
                }
              }
              viewBox = "0 0 30 18"
            >
              <path d = "M26.79 9.38A0.31 0.31 0 0 0 26.79 8.79L0.41 0.02C0.36 0 0.34 0 0.32 0 0.14 0 0 0.13 0 0.29 0 0.33 0.01 0.37 0.03 0.41L3.44 9.08 0.03 17.76A0.29 0.29 0 0 0 0.01 17.8 0.28 0.28 0 0 0 0.01 17.86C0.01 18.02 0.14 18.16 0.3 18.16A0.3 0.3 0 0 0 0.41 18.14L26.79 9.38ZM0.81 0.79L24.84 8.79 3.98 8.79 0.81 0.79ZM3.98 9.37L24.84 9.37 0.81 17.37 3.98 9.37Z" />
            </svg>
          </button>
        </div>

        {showLimitCharacter && (
          <div className="characterLimit">{characterLimit - value.length}</div>
        )}
      </div>
    )
  }
}

Input.propTypes = {
  onSubmit: PropTypes.func,
  onInputHeight: PropTypes.func,
  enableHistoryInput: PropTypes.bool,
  characterLimit: PropTypes.number,
  inputPlaceholder: PropTypes.string,
}

export default Input
