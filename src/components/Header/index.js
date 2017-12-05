import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Header = ({ closeWebchat, preferences }) => (
  <div
    className='Header'
    style={{
      color: preferences.complementaryColor,
      backgroundColor: preferences.accentColor,
    }}
  >
    <img className='Header--logo' src={preferences.headerLogo} />

    <div className='Header--title'>
      {preferences.headerTitle}
    </div>

    <div className='Header--btn' onClick={closeWebchat}>
      {'X'}
    </div>
  </div>
)

Header.propTypes = {
  closeWebchat: PropTypes.func,
  preferences: PropTypes.object,
}

export default Header
