import { createAsyncThunk } from "@reduxjs/toolkit";
import { postDataAPI } from "../../apis/fetchData";

export const userLogin = createAsyncThunk("api/login", async (data, { rejectWithValue }) => {
  try {
    const res = await postDataAPI('login', data);

    localStorage.setItem('userToken', res.data.accessToken);
    localStorage.setItem('userInfo', JSON.stringify(res.data.user));

    return res;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const userRegister = createAsyncThunk("api/register", async (data, { rejectWithValue }) => {
  try {
    const res = await postDataAPI('register', data);

    localStorage.setItem('userToken', res.data.accessToken);
    localStorage.setItem('userInfo', JSON.stringify(res.data.user));

    return res;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});