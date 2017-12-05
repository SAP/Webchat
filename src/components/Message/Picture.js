import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Picture = ({ content }) => {

  return (
    <img
      src={content}
      className={'Picture'}
    />
  )

}

Picture.propTypes = {
  content: PropTypes.string,
}

export default Picture
