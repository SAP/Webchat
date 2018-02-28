import { handleActions } from 'redux-actions'

const initialState = []

export default handleActions(
  {
    POLL_MESSAGES_SUCCESS: (state, { payload }) => {
      return [...state, ...payload.messages]
    },

    GET_MESSAGES_SUCCESS: (state, { payload: messages }) => {
      return messages
    },

    POST_MESSAGE_ERROR: (state, { payload }) => {
      const message = {
        ...payload.message,
        retry: true,
        id: `local-${Math.random()}`,
        participant: {
          isBot: false,
        },
      }

      return [...state, ...[message]]
    },

    REMOVE_MESSAGE: (state, { payload: messageId }) => {
      const newState = Object.assign([], state)
      const indexMessage = state.findIndex(message => message.id === messageId)
      newState.splice(indexMessage, 1)
      return newState
    }
  },
  initialState,
)
