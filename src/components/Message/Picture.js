import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import './style.scss'

const Picture = ({ content, isBot }) => {

  return (
    <img
      src={content}
      className={cx('Picture', { bot: isBot })}
    />
  )

}

Picture.propTypes = {
  isBot: PropTypes.bool,
  content: PropTypes.string,
}

export default Picture
