import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  profile: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    logout: (state) => {
      state.token = null
      state.profile = null
    },
  },
})

export const { setToken, setProfile, logout } = userSlice.actions
export default userSlice.reducer
