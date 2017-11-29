import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const ListElement = ({ title, subtitle, imageUrl, buttons, sendMessage }) => {
  const button = buttons[0]

  return (
    <div className='ListElement'>
      {imageUrl && <img src={imageUrl} className='ListElement--img' />}

      <div className='ListElement--container'>
        <p className='ListElement--title'>{title}</p>
        <p className='ListElement--subtitle'>{subtitle}</p>

        {button && (
          <div
            className='ListElement--button'
            onClick={() => sendMessage({ type: 'text', content: button.value })}
          >
            {button.title}
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
  return (
    <div className={cx('List', { bot: isBot })}>
      {content.elements.map((element, i) => (
        <ListElement
          key={i}
          {...element}
          sendMessage={sendMessage}
        />
      ))}
    </div>
  )
}

List.propTypes = {
  isBot: PropTypes.bool,
  content: PropTypes.object,
  sendMessage: PropTypes.func,
}

export default List
