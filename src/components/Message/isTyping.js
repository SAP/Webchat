import React, { Component } from 'react'
import PropTypes from 'prop-types'
import validURL from 'valid-url'

import './style.scss'

class IsTyping extends Component {
  componentDidMount() {
    const { callAfterTimeout, timeout } = this.props
    setTimeout(callAfterTimeout, timeout)
  }

  render() {
    const { image } = this.props

    if (!validURL.isUri(value) || !validURL.isWebUri(value)) {
      return null
    }

    return (
      <div className="RecastAppMessage bot">
        {image && <img className="RecastAppMessage--logo visible" src={image} />}
        <img src="https://cdn.recast.ai/webchat/istyping.gif" />
      </div>
    )
  }
}

IsTyping.propTypes = {
  image: PropTypes.string,
  callAfterTimeout: PropTypes.func,
  timeout: PropTypes.number,
}

export default IsTyping
