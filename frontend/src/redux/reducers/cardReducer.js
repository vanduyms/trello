import { createSlice } from "@reduxjs/toolkit";
import { createComment, getCommentsFromCardId, deleteComment, updateComment } from "~/redux/actions/cardAction";

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
      .addCase(deleteComment.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.comments = state.comments.filter(comment => comment._id !== payload.data)
      })
      .addCase(deleteComment.rejected, (state) => {
        state.loading = false
      })
      .addCase(updateComment.pending, (state) => {
        state.loading = true
      })
      .addCase(updateComment.fulfilled, (state, { payload }) => {
        const index = state.comments.findIndex(comment => comment._id === payload.data._id)
        state.comments.splice(index, 1, payload.data)
      })
      .addCase(updateComment.rejected, (state) => {
        state.loading = false
      })
  }
});

export default cardSlice.reducer;