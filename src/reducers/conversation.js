import { handleActions } from 'redux-actions'

const initialState = {
  token: '',
  chatId: '',
  channelId: '',
  conversationId: '',
}

export default handleActions({

  SET_CREDENTIALS: (state, { payload }) => {
    return { ...state, ...payload }
  },

  CREATE_CONVERSATION_SUCCESS: (state, { payload: conversation }) => {
    const { id, chatId } = conversation
    return { ...state, chatId, conversationId: id }
  },

}, initialState)

