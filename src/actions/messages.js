import { createAction } from 'redux-actions'

export const postMessage = createAction('API:POST_MESSAGE', (channelId, token, data) => ({
  url: `/webhook/${channelId}`,
  method: 'post',
  headers: { Authorization: token },
  data,
}))

export const getMessages = createAction('API:GET_MESSAGES', (channelId, token, conversationId) => ({
  url: `/webhook/${channelId}/conversations/${conversationId}/messages`,
  method: 'get',
  headers: { Authorization: token },
}))

export const pollMessages = createAction(
  'API:POLL_MESSAGES',
  (channelId, token, conversationId, lastMessageId) => ({
    url: `/webhook/${channelId}/conversations/${conversationId}/poll`,
    method: 'get',
    headers: { Authorization: token },
    query: { last_message_id: lastMessageId }, // eslint-disable-line camelcase
  }),
)

export const removeMessage = createAction('REMOVE_MESSAGE')
export const setFirstMessage = createAction('SET_FIRST_MESSAGE')
