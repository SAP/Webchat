import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Picture = ({ content, onImageLoaded }) => {
  return <img onLoad={onImageLoaded} src={content} className={'Picture'} />
}

Picture.propTypes = {
  content: PropTypes.string,
  onImageLoaded: PropTypes.func,
}

export default Picture
