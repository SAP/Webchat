import React from 'react'
import PropTypes from 'prop-types'

import { truncate } from 'helpers'

import Button from 'components/Button'

const Card = ({ content, sendMessage }) => {
  const { title, subtitle, imageUrl, buttons } = content

  return (
    <div className={'Card'}>
      {imageUrl && <img src={imageUrl} className="Card--img" />}

      <div className="Card--text">
        <p className="Card--text-title">{truncate(title, 80)}</p>
        {subtitle && <p className="Card--text-subtitle">{truncate(subtitle, 80)}</p>}
      </div>

      <div className="Card--button-container">
        {buttons.slice(0, 3).map((b, i) => <Button key={i} button={b} sendMessage={sendMessage} />)}
      </div>
    </div>
  )
}

Card.propTypes = {
  content: PropTypes.object,
  sendMessage: PropTypes.func,
}

export default Card
