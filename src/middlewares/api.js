import config from 'config'
import qs from 'query-string'
import axios from 'axios'
import { pathOr, propOr } from 'ramda'

let lastProcessed = null
let createdConversation = false

function waitforTime (milisec) {
  return new Promise(resolve => { setTimeout(resolve, milisec) })
}

const delayBetweenMessages = async (messages, dispatch) => {
  const lastMsg = messages.slice(-1)[0]
  const lastMessageId = propOr(null, 'id', lastMsg)
  if (lastMessageId) {
    if (lastProcessed === lastMessageId) {
    // already processed skip for now. (Bug in server return the same list over and over)
      return
    }
    lastProcessed = lastMessageId
    // For polling set the lastMessageId to avoid getting the same messages again while dispatching
    dispatch({ type: 'SET_CREDENTIALS', payload: { lastMessageId } })
  }
  for (const msg of messages) {
    dispatch({ type: 'ADD_MESSAGES', payload: { messages: [msg] } })
    if (lastMessageId !== msg.id) {
    // If there is a delay in this message wait before showing the next message.
      const messageDelay = pathOr(0, ['attachment', 'delay'], msg) * 1000
      await waitforTime(messageDelay)
    }
  }
}

export default store => next => action => {
  if (!action.type.startsWith('API:')) {
    return next(action)
  }

  const { dispatch } = store
  const prefix = action.type.split(':')[1]
  const { method = 'get', url, data, headers, query } = action.payload

  const options = {
    method,
    data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    url: `${config.apiUrl}${url}${query ? '?' : ''}${qs.stringify(query || {})}`,
  }

  return axios(options)
    .then(res => {
      createdConversation = createdConversation || prefix === 'CREATE_CONVERSATION'
      const isFirstCall = propOr(null, 'last_message_id', query) === null && !createdConversation
      if (prefix === 'POLL_MESSAGES' && !isFirstCall) {
        const messages = pathOr([], ['data', 'results', 'messages'], res)
        delayBetweenMessages(messages, dispatch)
      } else {
        dispatch({ type: `${prefix}_SUCCESS`, payload: { ...res.data.results } })
      }
      return res.data.results
    })
    .catch(err => {
      const { response } = err
      dispatch({ type: `${prefix}_ERROR`, payload: { ...data, error: { response } } })
      throw new Error(err)
    })
}
