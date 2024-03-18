import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDataAPI, postDataAPI } from "../../apis/fetchData";
import { generatePlaceHolderCard } from "../../utils/formatter";
import { isEmpty } from "lodash";
import { mapOrder } from "~/utils/sort";

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

export const getBoardsOfMember = createAsyncThunk("board/getBoardsOfMember", async (id, { rejectWithValue }) => {
  try {
    const res = await getDataAPI(`boards/member/${id}`);

    return res;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const getBoardDetails = createAsyncThunk("board/getBoardDetails", async (id, { rejectWithValue }) => {
  try {
    const res = await getDataAPI(`boards/${id}`);

    let board = res.data;
    board.columns = mapOrder(board.columns, board.columnOrderIds, "_id");

    // When reload website, it is necessary to fix when dragging and dropping a item to an empty column
    board.columns.forEach((column) => {
      if (isEmpty(column.cards)) {
        column.cards = [generatePlaceHolderCard(column)];
        column.cardOrderIds = [generatePlaceHolderCard(column)._id];
      } else {
        column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
      }
    });

    return { ...res, data: board };
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const createNewColumn = createAsyncThunk("board/createNewColumn", async ({ board, newColumnData, userToken }, { rejectWithValue }) => {
  try {
    // Call API to create new column
    const res = await postDataAPI(
      `columns`,
      {
        ...newColumnData,
        boardId: board._id,
      },
      userToken
    );
    const createdNewColumn = res?.data;
    // When create new column, it doesn't has any card. Therefore, it is necessary to handle the problem of dragging and dropping into an empty column
    createdNewColumn.cards = [generatePlaceHolderCard(createdNewColumn)];
    createdNewColumn.cardOrderIds = [
      generatePlaceHolderCard(createdNewColumn)._id,
    ];

    const newBoard = { ...board }
    newBoard.columns = [...newBoard.columns, createdNewColumn];
    console.log(newBoard.columns);
    newBoard.columnOrderIds = [...newBoard.columnOrderIds, createdNewColumn._id];

    return { ...createdNewColumn, data: newBoard };
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});