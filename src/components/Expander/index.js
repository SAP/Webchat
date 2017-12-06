import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Expander = ({ onClick, preferences }) => (
  <div
    onClick={onClick}
    className="Expander"
    style={{
      color: preferences.complementaryColor,
      backgroundColor: preferences.accentColor,
    }}
  >
    {preferences.expanderLogo && <img className="Expander--logo" src={preferences.expanderLogo} />}

    {preferences.expanderTitle}

    {preferences.onboardingMessage && (
      <div className="Expander--onboarding">{preferences.onboardingMessage}</div>
    )}
  </div>
)

Expander.propTypes = {
  preferences: PropTypes.object,
  onClick: PropTypes.func.isRequired,
}

export default Expander
