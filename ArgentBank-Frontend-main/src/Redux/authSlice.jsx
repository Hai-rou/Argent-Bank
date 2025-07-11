import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userName: null,
  firstName: null,
  lastName: null,
  email: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload; // juste token string
    },
    setProfile: (state, action) => {
      state.userName = action.payload.userName;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.token = null;
      state.userName = null;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      localStorage.removeItem("token")
    }

    }
});

export const { login, setProfile, logout } = authSlice.actions;
export default authSlice.reducer;
