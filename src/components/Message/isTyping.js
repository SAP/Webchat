import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { sanitizeUrl } from '@braintree/sanitize-url'
import { propOr } from 'ramda'

import './style.scss'

class IsTyping extends Component {
  componentWillUnmount () {
    if (this._timer) {
      clearTimeout(this._timer)
    }
  }

  render () {
    const { image, onImageLoaded, callAfterTimeout } = this.props
    const timeout = propOr(20000, 'timeout', this.props)
    if (image && sanitizeUrl(image) === 'about:blank') {
      return null
    }

    if (this._timer) {
      clearTimeout(this._timer)
      this._timer = null
    }
    this._timer = setTimeout(callAfterTimeout, timeout)

    return (
      <div className='RecastAppMessage CaiAppMessage bot'>
        {image && <img className='RecastAppMessage--logo CaiAppMessage--logo visible' src={image} />}
        <img src='https://cdn.cai.tools.sap/webchat/istyping.gif' onLoad={onImageLoaded} />
      </div>
    )
  }
}

// ESLint thinks some PropTypes are not used, but they are retrived in method calls, so disable check
/* eslint-disable */
IsTyping.propTypes = {
  image: PropTypes.string,
  callAfterTimeout: PropTypes.func,
  onImageLoaded: PropTypes.func,
  timeout: PropTypes.number,
}

export default IsTyping
