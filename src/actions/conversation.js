import { createAction } from 'redux-actions'

export const setCredentials = createAction('SET_CREDENTIALS')

export const createConversation = createAction('API:CREATE_CONVERSATION', (channelId, token) => ({
  url: `/webhook/${channelId}/conversations`,
  method: 'post',
  headers: { Authorization: token, 'X-Token': token },
}))
