import { createSlice } from "@reduxjs/toolkit";

// Définit les donnée par défault
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
    //Met à jour du profil de l'utilisateur
    setProfile: (state, action) => {
      return { ...state, ...action.payload };
      // payload = { userName, firstName, lastName, email }
    },
    // Met à jour uniquement le username
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
    // Réinitialise l'état aux valeurs initial (vide tout les champs utilisateur)
    clearProfile: () => initialState
  }
});

export const { setProfile, updateUserName, clearProfile } = userSlice.actions;
export default userSlice.reducer;
