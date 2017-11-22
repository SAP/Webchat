import { combineReducers } from 'redux'

import messages from './messages'
import conversation from './conversation'

export default combineReducers({
  messages,
  conversation,
})
