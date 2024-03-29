import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/authReducer'
import boardReducer from './reducers/boardReducer'
// import cardReducer from './reducers/cardReducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardReducer,
    // cards: cardReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})