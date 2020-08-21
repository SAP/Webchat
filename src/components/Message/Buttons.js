import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'

import { truncate, safeArrayOfItem } from 'helpers'

import './style.scss'

const Buttons = ({ content, sendMessage, style, readOnlyMode, isLastMessage }) => {
  const { title, buttons } = content
  return (
    <div className='Buttons'>
      <p className='Buttons--title' style={style}>
        {truncate(title, 640)}
      </p>

      <div className='Buttons--container'>
        {safeArrayOfItem(buttons).slice(0, 3).map((b, i) => (
          <Button
            key={i}
            button={b}
            sendMessage={sendMessage}
            isLastMessage={isLastMessage}
            readOnlyMode={readOnlyMode} />
        ))}
      </div>
    </div>
  )
}

Buttons.propTypes = {
  isLastMessage: PropTypes.bool,
  style: PropTypes.object,
  content: PropTypes.object,
  sendMessage: PropTypes.func,
  readOnlyMode: PropTypes.bool,
}

export default Buttons
