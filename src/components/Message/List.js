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

  const button = propOr(null, 0, buttons)
  // https://support.wdf.sap.corp/sap/support/message/2080115903 fix
  // if (!button) {
  //   return null
  // }

  // https://sapjira.wdf.sap.corp/browse/SAPMLCONV-4781 - Support the pnonenumber options
  const formattedTitle = !button ? null : truncate(button.title, buttonTitleMaxLength)
  const telHref = () => {
    if (!button) {
      return null
    }
    return button.value && button.value.indexOf('tel:') === 0 ? button.value : `tel:${button.value}`
  }
  let content = null

  switch (button && button.type) {
  case 'phonenumber':
    content = (
      <a
        className='RecastAppListElement--button CaiAppListElement--button' href={telHref}>
        {formattedTitle}
      </a>
    )
    break
  case 'web_url':
    if (sanitizeUrl(button.value) !== 'about:blank') {
      content = (
        <a
          className='RecastAppListElement--button CaiAppListElement--button' href={button.value} target='_blank'
          rel='noopener noreferrer'>
          {formattedTitle}
        </a>
      )
    } else {
      content = 'about:blank'
    }
    break
  default:
    break
  }

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
          && (content ? (content !== 'about:blank' && (
            content
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
