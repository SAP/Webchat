import React, { Component } from 'react'
import PropTypes from 'prop-types'
import algoliasearch from 'algoliasearch'
import config from '../../config'

import './style.scss'

const client = algoliasearch(config.ALGOLIA_APPLICATION_ID, config.ALGOLIA_SEARCH_API_KEY)
const index = client.initIndex('spc_5')

export default class SuggestionsMenu extends Component {
  state = {
    suggestions: [],
  }

  componentDidUpdate(prevProps) {
    const { search } = this.props

    if (search !== prevProps.search) {
      index.search({ query: search }, (err, { hits } = {}) => {
        this.setState({ suggestions: hits || [] })
      })
    }
  }

  onSelect = value => () => {
    const { onSelect } = this.props
    onSelect(value)
  }

  render() {
    const { search } = this.props
    const { suggestions } = this.state

    if (!search) {
      return
    }

    return (
      <div className="SuggestionsMenu">
        {suggestions.slice(0, 5).map((suggestion, index) => (
          <div className="rowSuggestion" key={index} onClick={this.onSelect(suggestion.Question)}>
            {suggestion.Question}
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
