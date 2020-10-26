import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { sanitizeUrl } from '@braintree/sanitize-url'
import { propOr } from 'ramda'

import './style.scss'

class IsTyping extends Component {
  constructor (props) {
    super(props)
    this._setTimeoutCallBack = this._setTimeoutCallBack.bind(this)
    this._timer = null
  }

  shouldComponentUpdate (nextProps) {
    return this.props.timeout !== nextProps.timeout
      || this.props.callAfterTimeout !== nextProps.callAfterTimeout
  }

  componentDidUpdate () {
    this._setTimeoutCallBack()
  }

  componentWillUnmount () {
    if (this._timer) {
      clearTimeout(this._timer)
      this._timer = null
    }
  }

  _setTimeoutCallBack = () => {
    const callback = () => {
      this._timer = null
      if (typeof this.props.callAfterTimeout === 'function') {
        this.props.callAfterTimeout()
      }
    }
    const timeout = propOr(20000, 'timeout', this.props)
    if (this._timer) {
      clearTimeout(this._timer)
      this._timer = null
    }
    this._timer = setTimeout(callback, timeout)
  }

  render () {
    const { image, onImageLoaded } = this.props
    if (image && sanitizeUrl(image) === 'about:blank') {
      return null
    }

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
