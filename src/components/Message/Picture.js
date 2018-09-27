import React from 'react'
import PropTypes from 'prop-types'
import validURL from 'valid-url'

import './style.scss'

const Picture = ({ content, onImageLoaded }) => {
  if (!validURL.isUri(content) || content.includes('javascript:')) {
    return null
  }
  return <img onLoad={onImageLoaded} src={content} className={'RecastAppPicture'} />
}

Picture.propTypes = {
  content: PropTypes.string,
  onImageLoaded: PropTypes.func,
}

export default Picture
