import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Contient par ex { name, token, etc. }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; 
      // payload ex: { token: 'abc123', name: 'Alice' }
    },
    logout: (state) => {
      state.user = null;
    },
    setProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload
      };
    }
  },
});

export const { login, logout, setProfile } = authSlice.actions;

export default authSlice.reducer;
