import { createAsyncThunk } from "@reduxjs/toolkit";
import { postDataAPI, putDataAPI } from "../../apis/fetchData";
import { imageUpload } from "~/utils/imageUpload";
import { toast } from "react-toastify";

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

export const userUpdate = createAsyncThunk("api/updateUser", async ({ id, data, toast }, { rejectWithValue }) => {
  try {
    const image = data.avatar;
    const avatarUrl = await imageUpload(image);

    const updateData = {
      ...data,
      avatar: avatarUrl.url
    }

    const res = await putDataAPI(`users/${id}/update`, updateData);
    localStorage.setItem("userInfo", JSON.stringify((res.data)));

    toast.success("Updated profile success!")
    return res;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});


export const sendResetPassword = createAsyncThunk("api/sendResetPassword", async (email, { rejectWithValue }) => {
  try {
    const result = postDataAPI("forgotPassword", { email });

    return result;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
})

export const resetPassword = createAsyncThunk("api/resetPassword", async ({ infoResetPassword, password }, { rejectWithValue }) => {
  try {
    const result = await postDataAPI(`${infoResetPassword}`, { password });
    return result;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
})