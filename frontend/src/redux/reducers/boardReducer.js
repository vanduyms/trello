import { createSlice } from "@reduxjs/toolkit";
import {
  updateCard,
  deleteCard,
  createComment,
  deleteComment,
  updateComment
} from "~/redux/actions/cardAction";
import {
  createNewBoard,
  getBoardsIsOwnerAndMember,
  getBoardDetails,
  createNewColumn,
  deleteColumnDetails,
  createNewCard,
  moveColumns,
  moveCardInTheSameColumn,
  moveCardToDifferentColumn,
  searchBoardTitle,
  shareBoard,
  deleteBoard
} from "~/redux/actions/boardAction";

const boardsRecentView = localStorage.getItem("boardsRecentlyViewed") ? JSON.parse(localStorage.getItem("boardsRecentlyViewed")) : [];

const initialState = {
  loading: false,
  boardsIsOwner: [],
  boardsIsMember: [],
  boardDetails: null,
  boardsRecentlyViewed: boardsRecentView
};

const boardSlice = createSlice({
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

      // state.boardsRecentlyViewed = state.boardsRecentlyViewed.filter(board => allBoards.includes(board));

      state.boardsRecentlyViewed.sort((a, b) => b.time - a.time)

      localStorage.setItem("boardsRecentlyViewed", JSON.stringify(state.boardsRecentlyViewed))
    },
    updateBoard: (state, { payload }) => {
      state.boardDetails = payload
    }
  },
  extraReducers: (builder) => {
    builder
      // Create new Board
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

      // Search board by title
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

      // Get boards is owner and member
      .addCase(getBoardsIsOwnerAndMember.pending, (state) => {
        state.loading = true
      })
      .addCase(getBoardsIsOwnerAndMember.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardsIsOwner = payload.data.boardsIsOwner
        state.boardsIsMember = payload.data.boardsIsMember
      })
      .addCase(getBoardsIsOwnerAndMember.rejected, (state) => {
        state.loading = false
      })

      // Get board details
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

      // Delete board
      .addCase(deleteBoard.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteBoard.fulfilled, (state) => {
        state.loading = false
        state.boardDetails = null
      })
      .addCase(deleteBoard.rejected, (state) => {
        state.loading = false
      })

      // Share board to user
      .addCase(shareBoard.pending, (state) => {
        state.loading = true
      })
      .addCase(shareBoard.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails.members = payload.data
      })
      .addCase(shareBoard.rejected, (state) => {
        state.loading = false
      })

      // Column
      // Create new column
      .addCase(createNewColumn.pending, (state) => {
        state.loading = true
      })
      .addCase(createNewColumn.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })
      .addCase(createNewColumn.rejected, (state) => {
        state.loading = false
      })

      // Move column
      .addCase(moveColumns.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })

      // Delete a column
      .addCase(deleteColumnDetails.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })

      // Card
      // Create new card
      .addCase(createNewCard.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })

      // Move card
      .addCase(moveCardInTheSameColumn.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })
      .addCase(moveCardToDifferentColumn.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })

      // Update card
      .addCase(updateCard.pending, (state) => {
        state.loading = true
      })
      .addCase(updateCard.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })

      // Delete card
      .addCase(deleteCard.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteCard.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })

      // Comments
      // Create new comment
      .addCase(createComment.pending, (state) => {
        state.loading = true
      })
      .addCase(createComment.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })
      .addCase(createComment.rejected, (state) => {
        state.loading = false
      })

      // Delete a comment
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })

      // Update comment
      .addCase(updateComment.fulfilled, (state, { payload }) => {
        state.loading = false
        state.boardDetails = payload.data
      })
  }
});

export const { addToRecentlyViewed, updateBoard } = boardSlice.actions
export default boardSlice.reducer;