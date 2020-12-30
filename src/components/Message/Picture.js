import React from 'react'
import PropTypes from 'prop-types'
import { sanitizeUrl } from '@braintree/sanitize-url'

import './style.scss'

const Picture = ({ content, onImageLoaded }) => {
   if (content && sanitizeUrl(content) === 'about:blank') {
	return null
   }
   if (content.includes('youtube.com/embed')) {
	return <iframe width='100%' height='auto' src={content} />
   }
   return <img onLoad={onImageLoaded} src={content} className={'RecastAppPicture CaiAppPicture'} />
}

Picture.propTypes = {
  content: PropTypes.string,
  onImageLoaded: PropTypes.func,
}

export default Picture
