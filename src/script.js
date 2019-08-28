import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'store'

import { getChannelPreferences, register } from 'actions/channel'
import App from 'containers/App'

const idChatDiv = 'cai-webchat-div'

if (!document.getElementById(idChatDiv)) {
  const element = document.createElement('div')
  element.id = idChatDiv
  document.body.appendChild(element)
}

const root = document.getElementById(idChatDiv)

const script = document.currentScript || document.getElementById('cai-webchat')

const channelId = script.getAttribute('channelId')
const token = script.getAttribute('token')
const imgUrlPath = script.getAttribute('imgUrlPath')
const registerUrlPath = script.getAttribute('registerUrlPath')

if (root && channelId && token && registerUrlPath) {
  register(registerUrlPath)
    .then(() => getChannelPreferences(channelId, token))
    .then(preferences => {
      ReactDOM.render(
        <Provider store={store}>
          <App token={token} channelId={channelId} preferences={preferences}
               imgUrlPath={imgUrlPath}/>
        </Provider>,
        root,
      )
    })
}
