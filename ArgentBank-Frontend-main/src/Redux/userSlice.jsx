import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  firstName: null,
  lastName: null,
  email: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      return { ...state, ...action.payload };
      // payload = { userName, firstName, lastName, email }
    },
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
    clearProfile: () => initialState
  }
});

export const { setProfile, updateUserName, clearProfile } = userSlice.actions;
export default userSlice.reducer;
