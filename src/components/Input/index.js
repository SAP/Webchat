import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import SendButton from 'components/SendButton'

import Menu from 'components/Menu'
import MenuSVG from 'components/svgs/menu'
import './style.scss'

// Number of minimum char to display the char limit.
const NUMBER_BEFORE_LIMIT = 5

class Input extends Component {
  state = {
    value: '',
    previousValues: [],
    historyValues: [],
    indexHistory: 0,
    menuOpened: false,
    menuIndexes: [],
  }

  componentDidMount() {
    this._input.focus()
    this._input.value = ''

    this.onInputHeight()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.value !== this.state.value ||
      nextState.menuOpened !== this.state.menuOpened ||
      nextState.menuIndexes.length !== this.state.menuIndexes.length
    )
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
      this.props.onSubmit({
        type: 'text',
        content,
      })
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

  removeMenuIndex = () => {
    const { menuIndexes } = this.state
    this.setState({ menuIndexes: menuIndexes.slice(0, -1) })
  }

  addMenuIndex = i => {
    const { menuIndexes } = this.state
    this.setState({ menuIndexes: [...menuIndexes, i] })
  }

  getCurrentMenu = () => {
    const { menuIndexes } = this.state

    return menuIndexes.reduce((currentMenu, i) => currentMenu.call_to_actions[i], this.props.menu)
  }

  triggerMenu = () => {
    const { menuOpened } = this.state
    if (menuOpened) {
      return this.setState({ menuOpened: false, menuIndexes: [] })
    }
    return this.setState({ menuOpened: true })
  }

  render() {
    const { enableHistoryInput, characterLimit, menu, preferences, inputPlaceholder } = this.props
    const { value, menuOpened } = this.state

    const showLimitCharacter = characterLimit
      ? characterLimit - value.length <= NUMBER_BEFORE_LIMIT
      : null

    return (
      <div
        className="RecastAppInput"
        ref={ref => {
          this.inputContainer = ref
        }}
      >
        {menu && <MenuSVG onClick={this.triggerMenu} />}

        {menuOpened && (
          <Menu
            closeMenu={this.triggerMenu}
            currentMenu={this.getCurrentMenu()}
            addMenuIndex={this.addMenuIndex}
            removeMenuIndex={this.removeMenuIndex}
            postbackClick={value => this.setState({ value }, this.sendMessage)}
          />
        )}

        <textarea
          ref={i => (this._input = i)}
          value={value}
          style={{
            width: '100%',
            maxHeight: 70,
            resize: 'none',
          }}
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
        
        <SendButton
          preferences={preferences}
          sendMessage={this.sendMessage}
          value={value}
        />
        
        {showLimitCharacter && (
          <div className="characterLimit">{characterLimit - value.length}</div>
        )}
      </div>
    )
  }
}

Input.propTypes = {
  menu: PropTypes.object,
  onSubmit: PropTypes.func,
  onInputHeight: PropTypes.func,
  enableHistoryInput: PropTypes.bool,
  characterLimit: PropTypes.number,
  inputPlaceholder: PropTypes.string,
  preferences: PropTypes.object,
}

export default Input
