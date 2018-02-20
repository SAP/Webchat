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
    },

    ADD_BOT_MESSAGE: (state, { payload: messages }) => {
      const getMessageTemplate = content => ({
        attachment: content,
        id: `local-${Math.random()}`,
        participant: {
          isBot: true,
        },
      })

      const formattedMessages = messages.map(message => getMessageTemplate(message))
      return [...state, ...formattedMessages]
    },

    ADD_USER_MESSAGE: (state, { payload }) => {
      const message = {
        ...payload,
        id: `local-${Math.random()}`,
        isSending: false,
        participant: {
          isBot: false,
        },
      }

      console.log("REDUCER payload", payload)
      console.log("REDUCER message", message)
      return [...state, ...[message]]
    },
  },
  initialState,
)
