import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'react-app-polyfill/ie11'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'store'

import { getChannelPreferences } from 'actions/channel'
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

const readOnly = false
if (root && channelId && token) {
  getChannelPreferences(channelId, token).then(preferences => {
    const scriptPreferences = {
      ...preferences,
      ...script.dataset,
    }

    ReactDOM.render(
      <Provider store={store}>
        <App
          token={token}
          channelId={channelId}
          preferences={scriptPreferences}
          readOnlyMode={readOnly}
        />
      </Provider>,
      root,
    )
  })
}
