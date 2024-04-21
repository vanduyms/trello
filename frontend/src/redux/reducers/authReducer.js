import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister, userUpdate, sendResetPassword, resetPassword } from "~/redux/actions/authAction";

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
  resetInfo: null
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
      // Login
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

      // Register
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

      // Update
      .addCase(userUpdate.pending, (state) => {
        state.loading = true
      })
      .addCase(userUpdate.fulfilled, (state, { payload }) => {
        state.loading = false
        state.userInfo = payload.data
      })
      .addCase(userUpdate.rejected, (state) => {
        state.loading = false
      })

      // Send reset password
      .addCase(sendResetPassword.pending, (state) => {
        state.loading = true
      })
      .addCase(sendResetPassword.fulfilled, (state, { payload }) => {
        state.loading = false
        state.resetInfo = payload.data
      })
      .addCase(sendResetPassword.rejected, (state) => {
        state.loading = false
      })

      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.loading = false
        state.resetInfo = payload.data
      })
      .addCase(resetPassword.rejected, (state) => {
        state.loading = false
      })
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;