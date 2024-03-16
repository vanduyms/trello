import { createAsyncThunk } from "@reduxjs/toolkit";
import { postDataAPI } from "../../apis/fetchData";

export const userLogin = createAsyncThunk("api/login", async (data, { rejectWithValue }) => {
  try {
    console.log(data);
    const res = await postDataAPI('/login', data);
    console.log(res);

    localStorage.setItem('userToken', res.data.accessToken);
    localStorage.setItem('userInfo', JSON.stringify(res.data.user));

    return res;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data.msg)
    } else {
      return rejectWithValue(error.response);
    }
  }
})