import React from 'react'

import './style.scss'

const Header = () => (
  <div className='Header'>
    <img className='Header--logo' src='https://blog.recast.ai/wp-content/uploads/2017/05/recast-ai-logo-small.png' />

    <div className='Header--title'>
      {'My awesome title'}
    </div>

    <div className='Header--btn'>
      {'X'}
    </div>
  </div>
)

export default Header
