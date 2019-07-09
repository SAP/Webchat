import React from 'react'
import PropTypes from 'prop-types'
import { sanitizeUrl } from '@braintree/sanitize-url'
import propOr from 'ramda/es/propOr'

import { truncate } from 'helpers'

import Button from 'components/Button'

const ListElement = ({ title, subtitle, imageUrl, buttons, sendMessage }) => {
  const titleMaxLength = 25
  const subTitleMaxLength = 50
  const buttonTitleMaxLength = 20

  const button = Array.isArray(buttons) && propOr(null, 0, buttons)

  return (
    <div className='RecastAppListElement CaiAppListElement'>
      {imageUrl
        && sanitizeUrl(imageUrl) !== 'about:blank' && (
        <img src={imageUrl} className='RecastAppListElement--img CaiAppListElement--img' />
      )}

      <div className='RecastAppListElement--container CaiAppListElement--container'>
        <p className='RecastAppListElement--title CaiAppListElement--title'>{truncate(title, titleMaxLength)}</p>
        <p className='RecastAppListElement--subtitle CaiAppListElement--subtitle'>{truncate(subtitle, subTitleMaxLength)}</p>

        {button
          && (button.type === 'web_url' ? (
            sanitizeUrl(button.value) !== 'about:blank' && (
              <a
                href={button.value}
                className='RecastAppListElement--button CaiAppListElement--button'
                target='_blank'
                rel='noopener noreferrer'
              >
                {truncate(button.title, buttonTitleMaxLength)}
              </a>
            )
          ) : (
            <div
              className='RecastAppListElement--button CaiAppListElement--button'
              onClick={() => sendMessage({ type: 'text', content: button.value })}
            >
              {truncate(button.title, buttonTitleMaxLength)}
            </div>
          ))}
      </div>
    </div>
  )
}

ListElement.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  imageUrl: PropTypes.string,
  buttons: PropTypes.array,
  sendMessage: PropTypes.func,
}

const List = ({ content, sendMessage }) => {
  const button = content.buttons && content.buttons[0]

  return (
    <div className={'RecastAppList CaiAppList'}>
      {content.elements.map((element, i) => (
        <ListElement key={i} {...element} sendMessage={sendMessage} />
      ))}

      {button && (
        <div className='RecastAppList--button CaiAppList--button'>
          <Button button={button} sendMessage={sendMessage} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  content: PropTypes.object,
  sendMessage: PropTypes.func,
}

export default List
