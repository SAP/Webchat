import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Expander = ({ onClick, preferences, style }) => (
  <div
    onClick={onClick}
    className="RecastAppExpander"
    style={{
      color: preferences.complementaryColor,
      backgroundColor: preferences.accentColor,
      ...style,
    }}
  >
    {preferences.expanderLogo && (
      <img className="RecastAppExpander--logo" src={preferences.expanderLogo} />
    )}

    {preferences.expanderTitle}

    {preferences.onboardingMessage && (
      <div className="RecastAppExpander--onboarding">{preferences.onboardingMessage}</div>
    )}
  </div>
)

Expander.propTypes = {
  preferences: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
}

export default Expander
