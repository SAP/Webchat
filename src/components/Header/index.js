import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Header = ({ closeWebchat, preferences, logoStyle }) => (
  <div
    className='CaiAppHeader'
    style={{
      color: preferences.complementaryColor,
      backgroundColor: preferences.accentColor,
    }}
  >
    <img className='CaiAppHeader--logo' src={preferences.headerLogo} style={logoStyle} />

    <div className='CaiAppHeader--title'>{preferences.headerTitle}</div>

    <div className='CaiAppHeader--btn' onClick={closeWebchat}>
      <img src='https://cdn.cai.tools.sap/webchat/close.svg' />
    </div>
  </div>
)

Header.propTypes = {
  closeWebchat: PropTypes.func,
  preferences: PropTypes.object,
  logoStyle: PropTypes.object,
}

export default Header
