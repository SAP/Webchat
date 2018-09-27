import React from 'react'
import PropTypes from 'prop-types'
import validURL from 'valid-url'

import { truncate } from 'helpers'

import Button from 'components/Button'

const ListElement = ({ title, subtitle, imageUrl, buttons, sendMessage }) => {
  const button = buttons[0]

  if (!validURL.isUri(imageUrl) || (button.type === 'web_url' && (!validURL.isUri(button.value) || !validURL.isWebUri(button.value)))) {
    return null
  }

  return (
    <div className="RecastAppListElement">
      {imageUrl && <img src={imageUrl} className="RecastAppListElement--img" />}

      <div className="RecastAppListElement--container">
        <p className="RecastAppListElement--title">{truncate(title, 25)}</p>
        <p className="RecastAppListElement--subtitle">{truncate(subtitle, 50)}</p>

        {button &&
          (button.type === 'web_url' ? (
            <a
              href={button.value}
              className="RecastAppListElement--button"
              target="_blank"
              rel="noopener noreferrer"
            >
              {truncate(button.title, 20)}
            </a>
          ) : (
            <div
              className="RecastAppListElement--button"
              onClick={() => sendMessage({ type: 'text', content: button.value })}
            >
              {truncate(button.title, 20)}
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
    <div className={'RecastAppList'}>
      {content.elements.map((element, i) => (
        <ListElement key={i} {...element} sendMessage={sendMessage} />
      ))}

      {button && (
        <div className="RecastAppList--button">
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
