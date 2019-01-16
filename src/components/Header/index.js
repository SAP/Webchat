import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Header = ({ closeWebchat, preferences, logoStyle }) => (
  <div
    className='RecastAppHeader CaiAppHeader'
    style={{
      color: preferences.complementaryColor,
      backgroundColor: preferences.accentColor,
    }}
  >
    <img className='RecastAppHeader--logo CaiAppHeader--logo' src={preferences.headerLogo} style={logoStyle} />

    <div className='RecastAppHeader--title CaiAppHeader--title'>{preferences.headerTitle}</div>

    <div className='RecastAppHeader--btn CaiAppHeader--btn' onClick={closeWebchat}>
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
