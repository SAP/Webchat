import React, { Component } from 'react'

import Header from 'components/Header'
import Live from 'components/Live'
import Input from 'components/Input'

import './style.scss'

class Chat extends Component {

  render () {
    return (
      <div className='Chat'>
        <Header />

        <Live />

        <Input />
      </div>
    )
  }

}

export default Chat
