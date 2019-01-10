import React from 'react'
import PropTypes from 'prop-types'
import { sanitizeUrl } from '@braintree/sanitize-url'

import { truncate } from 'helpers'

import Button from 'components/Button'

const ListElement = ({ title, subtitle, imageUrl, buttons, sendMessage }) => {
  const button = buttons[0]
  const titleMaxLength = 25
  const subTitleMaxLength = 50
  const buttonTitleMaxLength = 20

  return (
    <div className='CaiAppListElement'>
      {imageUrl
        && sanitizeUrl(imageUrl) !== 'about:blank' && (
        <img src={imageUrl} className='CaiAppListElement--img' />
      )}

      <div className='CaiAppListElement--container'>
        <p className='CaiAppListElement--title'>{truncate(title, titleMaxLength)}</p>
        <p className='CaiAppListElement--subtitle'>{truncate(subtitle, subTitleMaxLength)}</p>

        {button
          && (button.type === 'web_url' ? (
            sanitizeUrl(button.value) !== 'about:blank' && (
              <a
                href={button.value}
                className='CaiAppListElement--button'
                target='_blank'
                rel='noopener noreferrer'
              >
                {truncate(button.title, buttonTitleMaxLength)}
              </a>
            )
          ) : (
            <div
              className='CaiAppListElement--button'
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
    <div className={'CaiAppList'}>
      {content.elements.map((element, i) => (
        <ListElement key={i} {...element} sendMessage={sendMessage} />
      ))}

      {button && (
        <div className='CaiAppList--button'>
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
