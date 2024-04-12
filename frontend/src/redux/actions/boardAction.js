import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDataAPI, getDataAPI, postDataAPI, putDataAPI } from "../../apis/fetchData";
import { generatePlaceHolderCard } from "../../utils/formatter";
import { isEmpty } from "lodash";
import { mapOrder } from "~/utils/sort";
import { cloneDeep } from "lodash";

export const createNewBoard = createAsyncThunk("board/createNewBoard", async (data, { rejectWithValue }) => {
  try {
    const res = await postDataAPI(`boards`, data);

    return res;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const searchBoardTitle = createAsyncThunk("board/search", async (title, { rejectWithValue }) => {
  try {
    const res = await getDataAPI(`boards/search?title=${title}`);

    return res;
  } catch (error) {
    // console.log(error)
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});


export const getBoardsIsOwnerAndMember = createAsyncThunk("board/getBoardIsOwnerAndMember", async (id, { rejectWithValue }) => {
  try {
    const res = await getDataAPI(`boards/ownAndMem/${id}`);

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

export const shareBoard = createAsyncThunk("board/shareBoard", async ({ boardId, userShareAdded }, { rejectWithValue }) => {
  try {
    const memberIds = userShareAdded.map(user => user._id);

    await putDataAPI(`boards/${boardId}`, {
      memberIds: memberIds
    });

    return { data: userShareAdded };
  } catch (error) {
    // console.log(error)
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

export const createNewColumn = createAsyncThunk("board/createNewColumn", async ({ board, newColumnData }, { rejectWithValue }) => {
  try {
    // Call API to create new column
    const res = await postDataAPI(
      `columns`,
      {
        ...newColumnData,
        boardId: board._id,
      }
    );
    const createdNewColumn = res?.data;
    // When create new column, it doesn't has any card. Therefore, it is necessary to handle the problem of dragging and dropping into an empty column
    createdNewColumn.cards = [generatePlaceHolderCard(createdNewColumn)];
    createdNewColumn.cardOrderIds = [
      generatePlaceHolderCard(createdNewColumn)._id,
    ];

    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdNewColumn);
    newBoard.columnOrderIds.push(createdNewColumn._id);

    return { ...createdNewColumn, data: newBoard };
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const moveColumns = createAsyncThunk("board/moveColumns", async ({ board, dndOrderedColumns }, { rejectWithValue }) => {
  try {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = cloneDeep(board);
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;

    putDataAPI(
      `boards/${newBoard._id}`,
      {
        columnOrderIds: dndOrderedColumnsIds,
      },
    );

    return { data: newBoard };
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const deleteColumnDetails = createAsyncThunk('board/deleteColumnDetails', async ({ board, columnId }, { rejectWithValue }) => {
  try {
    // const res = await deleteDataAPI(`columns/${columnId}`);
    deleteDataAPI(`columns/${columnId}`);

    const newBoard = cloneDeep(board);
    newBoard.columns = newBoard.columns.filter((c) => c._id !== columnId);
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
      (_id) => _id !== columnId
    );
    return { data: newBoard };
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const createNewCard = createAsyncThunk('board/createNewCard', async ({ board, newCardData }, { rejectWithValue }) => {
  try {
    const res = await postDataAPI(
      `cards`,
      {
        ...newCardData,
        boardId: board._id,
      }
    );

    const createdNewCard = res?.data;

    let newBoard = cloneDeep(board);

    const columnToUpdated =
      newBoard.columns.find(
        (column) => column._id === createdNewCard.columnId
      )

    if (columnToUpdated.cards.some((card) => card.FE_PlaceholderCard)) {
      columnToUpdated.cards = [createdNewCard];
      columnToUpdated.cardOrderIds = [createdNewCard._id];
    } else {
      columnToUpdated.cards.push(createdNewCard);
      columnToUpdated.cardOrderIds.push(createdNewCard._id);
    }

    return { data: newBoard };
  } catch (error) {
    // console.log(error);
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const moveCardInTheSameColumn = createAsyncThunk('board/moveCardInTheSameColumn', async ({ board, dndOrderedCards, dndOrderedCardIds, columnId }, { rejectWithValue }) => {
  try {
    const newBoard = cloneDeep(board);
    const columnToUpdated = newBoard.columns.find(
      (column) => column._id === columnId
    );
    if (columnToUpdated) {
      columnToUpdated.cards = dndOrderedCards;
      columnToUpdated.cardOrderIds = dndOrderedCardIds;
    }
    putDataAPI(
      `columns/${columnId}`,
      { cardOrderIds: dndOrderedCardIds }
    );
    return { data: newBoard };
  } catch (error) {
    // console.log(error);
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const moveCardToDifferentColumn = createAsyncThunk('board/moveCardToDifferentColumn', async ({ board, currentCardId, prevColumnId, nextColumnId, nextColumns }, { rejectWithValue }) => {
  try {
    const dndOrderedColumnIds = nextColumns.map((c) => c._id);
    const newBoard = cloneDeep(board);
    newBoard.columns = nextColumns;
    newBoard.columnOrderIds = dndOrderedColumnIds;

    // Call API from BE
    let prevCardOrderIds = nextColumns.find(
      (c) => c._id === prevColumnId
    )?.cardOrderIds;
    // Solve the problem when pulling the last card from the column, the empty column will have a placeholder card, need to delete it before sending data to BE
    if (prevCardOrderIds[0].includes("placeholder-card")) prevCardOrderIds = [];

    // Call API to move card ro different column
    await putDataAPI(
      `boards/supports/moving_card`,
      {
        currentCardId,
        prevColumnId,
        prevCardOrderIds,
        nextColumnId,
        nextCardOrderIds: nextColumns.find((c) => c._id === nextColumnId)
          ?.cardOrderIds,
      }
    );
    return { data: newBoard };
  } catch (error) {
    // console.log(error);
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});