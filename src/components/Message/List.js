import React from 'react'
import PropTypes from 'prop-types'
import { sanitizeUrl } from '@braintree/sanitize-url'
import propOr from 'ramda/es/propOr'
import cx from 'classnames'

import { truncate, safeArrayOfItem, validButtonContent } from 'helpers'

import Button from 'components/Button'

const _getValidTelHref = (button, readOnlyMode) => {
  const value = propOr(null, 'value', button)
  if (!readOnlyMode && value) {
    return value.indexOf('tel:') === 0 ? value : `tel:${value}`
  }
  return '#'
}

const _getUrlInfo = (button, readOnlyMode) => {
  const value = propOr('#', 'value', button)
  const target = readOnlyMode ? '_self' : '_blank'
  const href = readOnlyMode ? '#' : value
  return {
    target,
    href,
  }
}

const _getButtonTitle = (button, buttonTitleMaxLength) => {
  const title = propOr(null, 'title', button)
  return title ? truncate(title, buttonTitleMaxLength) : null
}

const ListElement = ({ title, subtitle, imageUrl, buttons, sendMessage, readOnlyMode, isLastMessage }) => {
  const titleMaxLength = 25
  const subTitleMaxLength = 50
  const buttonTitleMaxLength = 20

  const button = propOr(null, 0, buttons)
  const type = propOr('none', 'type', button)
  const disableButton = readOnlyMode || (!isLastMessage && type === 'trigger_skill')

  // https://sapjira.wdf.sap.corp/browse/SAPMLCONV-4781 - Support the phonenumber options
  const buttonTitle = _getButtonTitle(button, buttonTitleMaxLength)
  const buttonClassName = cx('RecastAppListElement--button CaiAppListElement--button', { 'CaiAppListElement--ReadOnly': disableButton })
  let content = null
  switch (type) {
  case 'phonenumber':
    content = (
      <a
        className={buttonClassName}
        href={_getValidTelHref(button, disableButton)}>
        {buttonTitle}
      </a>
    )
    break
  case 'web_url':
    if (sanitizeUrl(button.value) !== 'about:blank') {
      const { href, target } = _getUrlInfo(button, disableButton)
      content = (
        <a
          className={buttonClassName}
          href={href}
          target={target}
          rel='noopener noreferrer'>
          {buttonTitle}
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
              className={buttonClassName}
              onClick={() => {
                // eslint-disable-next-line no-unused-expressions
                !disableButton
                && sendMessage({ type: 'button', content: validButtonContent(button) }, _getButtonTitle(button, 480))
              }}
            >
              {buttonTitle}
            </div>
          ))}
      </div>
    </div>
  )
}

ListElement.propTypes = {
  isLastMessage: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  imageUrl: PropTypes.string,
  buttons: PropTypes.array,
  sendMessage: PropTypes.func,
  readOnlyMode: PropTypes.bool,
}

const List = ({ content, sendMessage, readOnlyMode, isLastMessage }) => {
  const { buttons } = content
  const button = propOr(null, 0, buttons)

  return (
    <div className={'RecastAppList CaiAppList'}>
      {safeArrayOfItem(content && content.elements).map((element, i) => (
        <ListElement
          key={i} {...element}
          sendMessage={sendMessage}
          isLastMessage={isLastMessage}
          readOnlyMode={readOnlyMode} />
      ))}

      {button && (
        <div className='RecastAppList--button CaiAppList--button'>
          <Button
            button={button}
            sendMessage={sendMessage}
            isLastMessage={isLastMessage}
            readOnlyMode={readOnlyMode} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  isLastMessage: PropTypes.bool,
  content: PropTypes.object,
  sendMessage: PropTypes.func,
  readOnlyMode: PropTypes.bool,
}

export default List
