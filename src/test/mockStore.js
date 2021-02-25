import configureStore from 'redux-mock-store'
import apiMiddleware from '../middlewares/api'
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
  const { conversationId, channelId, token, configuration } = params
  const initialState = { channel: {}, conversation: {}, configuration: {}, session: {} }
  if (configuration) {
    initialState.configuration = configuration
  }
  if (conversationId) {
    initialState.conversation.conversationId = conversationId
  }
  if (channelId) {
    initialState.conversation.channelId = channelId
  }
  if (token) {
    initialState.conversation.token = token
  }
  initialState.messages = sampleMessages
  return initialState
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
