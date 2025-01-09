import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout , setLoading} = authSlice.actions;
export default authSlice.reducer;
