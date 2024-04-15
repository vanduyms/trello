import { createAsyncThunk } from "@reduxjs/toolkit";
import { postDataAPI } from "../../apis/fetchData";

export const createInvitation = createAsyncThunk("api/createInvitation", async (data, { rejectWithValue }) => {
  try {
    const res = await postDataAPI('invitations', data);

    return res;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});
