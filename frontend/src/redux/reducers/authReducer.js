import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "~/redux/actions/authAction";

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const userInfo = localStorage.getItem('userInfo')
  ? localStorage.getItem('userInfo')
  : null;

const initialState = {
  loading: false,
  userInfo,
  userToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    [userLogin.pending]: (state) => {
      state.loading = true
    },
    [userLogin.fulfilled]: (state, payload) => {
      state.loading = false
      state.userInfo = payload.data.user
      state.userToken = payload.data.access_token
    },
    [userLogin.rejected]: {

    }
  }
});

export default authSlice.reducer;