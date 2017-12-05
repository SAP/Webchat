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
  },
  initialState,
)
