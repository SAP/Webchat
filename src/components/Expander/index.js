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
    {'Call to action'}
  </div>
)

Expander.propTypes = {
  preferences: PropTypes.object,
  onClick: PropTypes.func.isRequired,
}

export default Expander
