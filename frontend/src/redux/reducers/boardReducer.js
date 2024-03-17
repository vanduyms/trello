import { createSlice } from "@reduxjs/toolkit";
import { getBoardsOfOwner } from "~/redux/actions/boardAction";

if (typeof userInfo === "string") userInfo = JSON.parse(userInfo);

const initialState = {
  loading: false,
  boards: [],
  boardId: [],
  boardDetails: null,
};

const authSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoardsOfOwner.pending, (state) => {
        state.loading = true
      })
      .addCase(getBoardsOfOwner.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boards = payload.data
      })
  }
});

export default authSlice.reducer;