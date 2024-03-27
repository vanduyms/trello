import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister } from "~/redux/actions/authAction";

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

let userInfo = localStorage.getItem('userInfo')
  ? localStorage.getItem('userInfo')
  : null;

if (typeof userInfo === "string") userInfo = JSON.parse(userInfo);

const initialState = {
  loading: false,
  userInfo,
  userToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken')
      localStorage.removeItem('userInfo')
      state.loading = false
      state.userInfo = null
      state.userToken = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userInfo = payload.data.user
        state.userToken = payload.data.accessToken
      })
      .addCase(userLogin.rejected, (state) => {
        state.loading = false
      })
      .addCase(userRegister.pending, (state) => {
        state.loading = true
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userInfo = payload.data.user
        state.userToken = payload.data.accessToken
      })
      .addCase(userRegister.rejected, (state) => {
        state.loading = false
      })
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;