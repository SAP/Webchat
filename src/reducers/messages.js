import { handleActions } from 'redux-actions'
import uniqWith from 'ramda/es/uniqWith'

const initialState = []

export default handleActions(
  {
    SET_FIRST_MESSAGE: (state, { payload: message }) => {
      return [
        {
          attachment: { type: 'text', content: message },
          id: `local-${Math.random()}`,
          isWelcomeMessage: true,
          participant: {
            isBot: true,
          },
        },
        ...state,
      ]
    },

    POLL_MESSAGES_SUCCESS: (state, { payload }) => {
      return uniqWith((m1, m2) => m1.id === m2.id, [...state, ...payload.messages])
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

    REMOVE_ALL_MESSAGES: () => {
      return []
    },

    ADD_BOT_MESSAGE: (state, { payload }) => {
      const getMessageTemplate = content => ({
        attachment: content,
        data: payload.data,
        id: `local-${Math.random()}`,
        participant: {
          isBot: true,
        },
      })

      const formattedMessages = payload.messages.map(message => getMessageTemplate(message))
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

      return [...state, ...[message]]
    },
  },
  initialState,
)
