import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Redux/authSlice.jsx'
import userReducer  from '../Redux/userSlice.jsx'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  },
})