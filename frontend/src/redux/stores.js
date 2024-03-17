import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import boardReducer from './reducers/boardReducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})