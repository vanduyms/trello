import { createSlice } from "@reduxjs/toolkit";
import {
  updateCard,
  deleteCard
} from "~/redux/actions/cardAction";
import {
  createNewBoard,
  getBoardsOfOwner,
  getBoardsOfMember,
  getBoardDetails,
  createNewColumn,
  deleteColumnDetails,
  createNewCard,
  moveColumns,
  moveCardInTheSameColumn,
  moveCardToDifferentColumn,
  searchBoardTitle
} from "~/redux/actions/boardAction";

const boardsRecentView = localStorage.getItem("boardsRecentlyViewed") ? JSON.parse(localStorage.getItem("boardsRecentlyViewed")) : [];

const initialState = {
  loading: false,
  boardsIsOwner: [],
  boardsIsMember: [],
  boardDetails: null,
  boards: [],
  boardsRecentlyViewed: boardsRecentView
};

const authSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addToRecentlyViewed: (state) => {
      const data = {
        time: Date.now(),
        board: {
          _id: state.boardDetails._id,
          title: state.boardDetails.title,
          description: state.boardDetails.description
        }
      }

      if (state.boardsRecentlyViewed.length > 0) {
        const filterBoard = state.boardsRecentlyViewed.filter(item => item.board._id !== state.boardDetails._id);
        state.boardsRecentlyViewed = [...filterBoard, data]
      } else {
        state.boardsRecentlyViewed = [...state.boardsRecentlyViewed, data]
      }

      state.boardsRecentlyViewed.sort((a, b) => b.time - a.time)

      localStorage.setItem("boardsRecentlyViewed", JSON.stringify(state.boardsRecentlyViewed))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewBoard.pending, (state) => {
        state.loading = true
      })
      .addCase(createNewBoard.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardsIsOwner = [...state.boardsIsOwner, payload.data]
      })
      .addCase(createNewBoard.rejected, (state) => {
        state.loading = false
      })
      .addCase(searchBoardTitle.pending, (state) => {
        state.loading = true
      })
      .addCase(searchBoardTitle.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boards = payload.data
      })
      .addCase(searchBoardTitle.rejected, (state) => {
        state.loading = false
      })
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
      .addCase(updateCard.pending, (state) => {
        state.loading = true
      })
      .addCase(updateCard.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })
      .addCase(deleteCard.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCard.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })
  }
});

export const { addToRecentlyViewed } = authSlice.actions
export default authSlice.reducer;