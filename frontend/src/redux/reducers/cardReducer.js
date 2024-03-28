import { createSlice } from "@reduxjs/toolkit";
import { createComment, getCommentsFromCardId } from "~/redux/actions/cardAction";

const initialState = {
  loading: false,
  card: null,
  comments: [],
};

const cardSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsFromCardId.pending, (state) => {
        state.loading = true
      })
      .addCase(getCommentsFromCardId.fulfilled, (state, { payload }) => {
        state.comments = payload.data
      })
      .addCase(getCommentsFromCardId.rejected, (state) => {
        state.loading = false
      })
      .addCase(createComment.pending, (state) => {
        state.loading = true
      })
      .addCase(createComment.fulfilled, (state, { payload }) => {
        state.comments = [payload.data, ...state.comments]
      })
      .addCase(createComment.rejected, (state) => {
        state.loading = false
      })
  }
});

export default cardSlice.reducer;