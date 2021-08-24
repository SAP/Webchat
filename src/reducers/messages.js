import { handleActions } from 'redux-actions'
import uniqWith from 'ramda/es/uniqWith'
import propOr from 'ramda/es/propOr'
import { ascend, prop, sortWith } from 'ramda'

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

    ADD_MESSAGES: (state, { payload }) => {
      // Avoid adding duplicate messages
      const uniqMessageList = uniqWith((m1, m2) => m1.id === m2.id, [...state, ...payload.messages])
      // Handle the case where the messages are dispatched out of order,
      // make sure the list is sorted by the received at date
      return sortWith([ascend(prop('receivedAt'))], uniqMessageList)
    },

    GET_MESSAGES_SUCCESS: (state, { payload: messages }) => {
      return messages
    },

    POST_MESSAGE_ERROR: (state, { payload }) => {
      const { message } = payload
      const error = propOr({}, 'error', payload)
      const response = propOr({}, 'response', error)
      const { status, data } = response
      const errorMessage = propOr(null, 'message', data)

      const msg = {
        ...message,
        retry: true,
        conversationExpired: status === 404
          && typeof errorMessage === 'string'
          && errorMessage.includes('Conversation not found'),
        id: `local-${Math.random()}`,
        participant: {
          isBot: false,
        },
      }

      return [...state, ...[msg]]
    },

    REMOVE_MESSAGE: (state, { payload: messageId }) => {
      const newState = Object.assign([], state)
      const indexMessage = state.findIndex(message => message.id === messageId)
      if (indexMessage >= 0) {
        newState.splice(indexMessage, 1)
      }
      return newState
    },

    REMOVE_ALL_MESSAGES: () => {
      return []
    },

    ADD_BOT_MESSAGE: (state, { payload }) => {
      const getMessageTemplate = content => ({
        attachment: content,
        data: payload.data,
        id: content.message_id || `local-${Math.random()}`,
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
