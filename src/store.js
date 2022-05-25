import api from 'middlewares/api'
import { configureStore } from '@reduxjs/toolkit'
import reducer from 'reducers/reducer'

export const store = configureStore({
  reducer,
  middleware: [api],
})
