import { handleActions } from 'redux-actions'
import propOr from 'ramda/es/propOr'

const initialState = {
  token: '',
  chatId: '',
  channelId: '',
  conversationId: '',
  lastMessageId: null,
}

export default handleActions(
  {
    SET_CREDENTIALS: (state, { payload }) => {
      return { ...state, ...payload }
    },

    REMOVE_CONVERSATION_ID: (state) => {
      return { ...state, conversationId: '', lastMessageId: null }
    },

    CREATE_CONVERSATION_SUCCESS: (state, { payload: conversation }) => {
      const { id, chatId } = conversation
      return { ...state, chatId, conversationId: id }
    },

    POLL_MESSAGES_SUCCESS: (state, { payload: { messages } }) => {
      const messagesLength = messages.length

      return messagesLength !== 0
        ? { ...state, lastMessageId: messages[messagesLength - 1].id }
        : state
    },

    POLL_MESSAGES_ERROR: (state, { payload }) => {
      const error = propOr({}, 'error', payload)
      const response = propOr({}, 'response', error)
      const { status, data } = response
      const errorMessage = propOr(null, 'message', data)

      return status === 404 && errorMessage === 'Conversation not found'
        ? { ...state, conversationId: '', lastMessageId: null }
        : state
    },

    GET_MESSAGES_SUCCESS: (state, { payload: { messages } }) => {
      const messagesLength = messages.length

      return messagesLength !== 0
        ? { ...state, lastMessageId: messages[messagesLength - 1].id }
        : state
    },
  },
  initialState,
)
