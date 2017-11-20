import React, { Component } from 'react'

import './style.scss'

class Input extends Component {

  render () {
    return (
      <div className='Input'>
        <form>
          <input
            placeholder={'Write a reply...'}
          />
        </form>
      </div>
    )
  }
}

export default Input
