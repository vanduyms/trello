import { createSlice } from "@reduxjs/toolkit";
import { getCommentsFromCardId } from "~/redux/actions/cardAction";

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
  }
});

export default cardSlice.reducer;