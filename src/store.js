import reducers from 'reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'

import api from 'middlewares/api'

const middlewares = [thunk, api]

export const store = compose(applyMiddleware(...middlewares))(createStore)(reducers)
