import reducers from 'reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'

import api from 'middlewares/api'
import crossApi from './middlewares/crossApi'

const middlewares = [thunk, api, crossApi]

export const store = compose(applyMiddleware(...middlewares))(createStore)(reducers)
