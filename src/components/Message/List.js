import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import { truncate } from 'helpers'

import Button from 'components/Button'

const ListElement = ({ title, subtitle, imageUrl, buttons, sendMessage }) => {
  const button = buttons[0]

  return (
    <div className='ListElement'>
      {imageUrl && <img src={imageUrl} className='ListElement--img' />}

      <div className='ListElement--container'>
        <p className='ListElement--title'>{truncate(title, 25)}</p>
        <p className='ListElement--subtitle'>{truncate(subtitle, 50)}</p>

        {button && (
          <div
            className='ListElement--button'
            onClick={() => sendMessage({ type: 'text', content: button.value })}
          >
            {truncate(button.title, 20)}
          </div>
        )}
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

const List = ({ content, isBot, sendMessage }) => {
  const button = content.buttons && content.buttons[0]

  return (
    <div className={cx('List', { bot: isBot })}>
      {content.elements.map((element, i) => (
        <ListElement
          key={i}
          {...element}
          sendMessage={sendMessage}
        />
      ))}

      {button && (
        <div className='List--button'>
          <Button button={button} sendMessage={sendMessage} />
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  isBot: PropTypes.bool,
  content: PropTypes.object,
  sendMessage: PropTypes.func,
}

export default List
