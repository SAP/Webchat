import React, { Component } from 'react'
import PropTypes from 'prop-types'
const algoliasearch = require('algoliasearch')

import './style.scss'

const client = algoliasearch('D2L9P3MZNX', '9ae78ab9c8dbc17c237f2883148e7c2a')
const index = client.initIndex('caiwebchat')

export default class SuggestionsMenu extends Component {
  state = {
    suggestions: [],
  }

  componentDidUpdate(prevProps) {
    const { search } = this.props

    if (search !== prevProps.search) {
      index.search({ query: search }, (err, { hits } = {}) => {
        console.log(hits)
        this.setState({ suggestions: hits })
      })
    }
  }

  onSelect = value => () => {
    const { onSelect } = this.props
    onSelect(value)
  }

  render() {
    const { suggestions } = this.state

    return (
      <div className="SuggestionsMenu">
        {suggestions.map((suggestion, index) => (
          <div className="rowSuggestion" key={index} onClick={this.onSelect(suggestion.value)}>
            {suggestion.value}
          </div>
        ))}
      </div>
    )
  }
}

SuggestionsMenu.propTypes = {
  search: PropTypes.string,
  onSelect: PropTypes.func,
}
