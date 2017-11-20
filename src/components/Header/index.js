import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Header = ({ closeWebchat }) => (
  <div className='Header'>
    <img className='Header--logo' src='https://blog.recast.ai/wp-content/uploads/2017/05/recast-ai-logo-small.png' />

    <div className='Header--title'>
      {'My awesome title'}
    </div>

    <div className='Header--btn' onClick={closeWebchat}>
      {'X'}
    </div>
  </div>
)

Header.propTypes = {
  closeWebchat: PropTypes.func,
}

export default Header
