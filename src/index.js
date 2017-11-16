import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// import Cookies from 'cookies-js'
import { store } from 'store'

import App from 'containers/App'

// TODO get the channel credentials
// const script = document.currentScript || document.getElementById('recast-webchat')
// const channel = script.getAttribute('channel')
// const token = script.getAttribute('token')

document.body.innerHTML += '<div id="recast-webchat-div"></div>'
const root = document.getElementById('recast-webchat-div')

if (root) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root,
  )
}
