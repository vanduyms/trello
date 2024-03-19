import { createSlice } from "@reduxjs/toolkit";
import {
  getBoardsOfOwner,
  getBoardsOfMember,
  getBoardDetails,
  createNewColumn,
  deleteColumnDetails,
  createNewCard,
  moveColumns,
  moveCardInTheSameColumn,
  moveCardToDifferentColumn
} from "~/redux/actions/boardAction";

if (typeof userInfo === "string") userInfo = JSON.parse(userInfo);

const initialState = {
  loading: false,
  boardsIsOwner: [],
  boardsIsMember: [],
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
        state.boardsIsOwner = payload.data
      })
      .addCase(getBoardsOfOwner.rejected, (state) => {
        state.loading = false
      })
      .addCase(getBoardsOfMember.pending, (state) => {
        state.loading = true
      })
      .addCase(getBoardsOfMember.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardsIsMember = payload.data
      })
      .addCase(getBoardsOfMember.rejected, (state) => {
        state.loading = false
      })
      .addCase(getBoardDetails.pending, (state) => {
        state.loading = true
      })
      .addCase(getBoardDetails.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })
      .addCase(getBoardDetails.rejected, (state) => {
        state.loading = false
      })
      .addCase(createNewColumn.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })
      .addCase(moveColumns.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })
      .addCase(deleteColumnDetails.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })
      .addCase(createNewCard.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })
      .addCase(moveCardInTheSameColumn.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })
      .addCase(moveCardToDifferentColumn.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })
  }
});

export default authSlice.reducer;