import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Expander = ({ onClick }) => (
  <div onClick={onClick} className="Expander">
    {'Call to action'}
  </div>
)

Expander.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Expander
