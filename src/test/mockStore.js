import configureStore from 'redux-mock-store'
import apiMiddleware from 'middlewares/api'
import { getChannelPreferences, setPreferences } from 'actions/channel'
import { setCredentials, createConversation } from 'actions/conversation'
import {
  postMessage,
  pollMessages,
  removeMessage,
  removeAllMessages,
  setFirstMessage,
  addBotMessage,
  addUserMessage,
} from 'actions/messages'

import { createAttachment } from 'test/messageUtil'

const middleware = [apiMiddleware]
export const mockStore = configureStore(middleware)

const buildSampleMessages = () => {
  const msg1 = createAttachment('1001', 'text', false, { text: 'Ask Bot Message Text' })
  const msg2 = createAttachment('1002', 'text', true, { text: 'Answer Message Text' })

  return [msg1, msg2]
}

export const sampleMessages = buildSampleMessages()

export const buildInitialState = (params) => {
  const { conversationId, channelId, token } = params
  const initState = { conversation: {} }
  if (conversationId) {
    initState.conversation.conversationId = conversationId
  }
  if (channelId) {
    initState.conversation.channelId = channelId
  }
  if (token) {
    initState.conversation.token = token
  }
  initState.messages = sampleMessages
  return initState
}

export const initialState = buildInitialState({ conversationId: 'conId123', channelId: 'chanId123', token: 'tokenId123' })

const expectedActions = [
  getChannelPreferences,
  setCredentials,
  setFirstMessage,
  setPreferences,
  createConversation,
  removeAllMessages,
  addBotMessage,
  addUserMessage,
  pollMessages,
  postMessage,
  removeMessage,
]

export const createStore = (state) => {
  return mockStore(state, expectedActions)
}

export const store = mockStore(initialState, expectedActions)
