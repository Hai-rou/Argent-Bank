import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Redux/authSlice.jsx'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})