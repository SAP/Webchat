import { handleActions } from 'redux-actions'

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

    GET_MESSAGES_SUCCESS: (state, { payload: { messages } }) => {
      const messagesLength = messages.length

      return messagesLength !== 0
        ? { ...state, lastMessageId: messages[messagesLength - 1].id }
        : state
    },
  },
  initialState,
)
