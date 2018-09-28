import React from 'react'
import PropTypes from 'prop-types'
import { sanitizeUrl } from '@braintree/sanitize-url'

import { truncate } from 'helpers'

import Button from 'components/Button'

const Card = ({ content, sendMessage, onImageLoaded }) => {
  const { title, subtitle, imageUrl, buttons } = content

  if (sanitizeUrl(imageUrl) === 'about:blank') {
    return null
  }

  return (
    <div className={'RecastAppCard'}>
      {imageUrl && <img src={imageUrl} onLoad={onImageLoaded} className="RecastAppCard--img" />}

      <div className="RecastAppCard--text">
        <p className="RecastAppCard--text-title">{truncate(title, 80)}</p>
        {subtitle && <p className="Card--text-subtitle">{truncate(subtitle, 80)}</p>}
      </div>

      {buttons.length ? (
        <div className="RecastAppCard--button-container">
          {buttons.slice(0, 3).map((b, i) => (
            <Button key={i} button={b} sendMessage={sendMessage} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

Card.propTypes = {
  content: PropTypes.object,
  sendMessage: PropTypes.func,
  onImageLoaded: PropTypes.func,
}

export default Card
