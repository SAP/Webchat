import React, { Component } from 'react'

import Expander from 'components/Expander'

import './style.scss'

class App extends Component {

  state = {
    expanded: false,
  }

  toggleChat = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const { expanded } = this.state

    return (
      <div className='RecastApp'>
        {!expanded && <Expander onClick={this.toggleChat} />}

        {expanded && (
          <div>
            {'lol'}
          </div>
        )}
      </div>
    )
  }

}

export default App
