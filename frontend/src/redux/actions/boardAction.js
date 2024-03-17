import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDataAPI } from "../../apis/fetchData";

export const getBoardsOfOwner = createAsyncThunk("board/getBoardsOfOwner", async (id, { rejectWithValue }) => {
  try {
    const res = await getDataAPI(`boards/owner/${id}`);

    return res;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});
