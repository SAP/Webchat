import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Button from 'components/Button'

const Card = ({ content, isBot, sendMessage }) => {
  const { title, subtitle, imageUrl, buttons } = content

  return (
    <div className={cx('Card', { bot: isBot })}>
      {imageUrl && <img src={imageUrl} className='Card--img' />}

      <div className='Card--text'>
        <p className='Card--text-title'>{title}</p>
        {subtitle && <p className='Card--text-subtitle'>{subtitle}</p>}
      </div>

      {buttons.map((b, i) => <Button key={i} button={b} sendMessage={sendMessage} />)}
    </div>
  )
}

Card.propTypes = {
  isBot: PropTypes.bool,
  content: PropTypes.object,
  sendMessage: PropTypes.func,
}

export default Card
