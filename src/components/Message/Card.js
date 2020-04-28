import React from 'react'
import PropTypes from 'prop-types'
import { sanitizeUrl } from '@braintree/sanitize-url'

import { truncate } from 'helpers'

import Button from 'components/Button'

const Card = ({ content, sendMessage, onImageLoaded, readOnlyMode }) => {
  const { title, subtitle, imageUrl, buttons } = content

  if (imageUrl && sanitizeUrl(imageUrl) === 'about:blank') {
    return null
  }
  // https://sapjira.wdf.sap.corp/browse/SAPMLCONV-6296
  // Need to check if buttons is null before rendering the button html.
  return (
    <div className={'RecastAppCard CaiAppCard'}>
      {imageUrl && <img src={imageUrl} onLoad={onImageLoaded} className='RecastAppCard--img CaiAppCard--img' />}

      <div className='RecastAppCard--text CaiAppCard--text'>
        <p className='RecastAppCard--text-title CaiAppCard--text-title'>{truncate(title, 80)}</p>
        {subtitle && <p className='Card--text-subtitle'>{truncate(subtitle, 80)}</p>}
      </div>

      {buttons && buttons.length ? (
        <div className='RecastAppCard--button-container CaiAppCard--button-container'>
          {buttons.slice(0, 3).map((b, i) => (
            <Button
              key={i}
              button={b}
              sendMessage={sendMessage}
              readOnlyMode={readOnlyMode} />
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
  readOnlyMode: PropTypes.bool,
}

export default Card
