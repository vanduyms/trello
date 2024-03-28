import { createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { putDataAPI, deleteDataAPI, getDataAPI, postDataAPI } from "~/apis/fetchData";

export const updateCard = createAsyncThunk("card/updateCard", async ({ board, id, data }, { rejectWithValue }) => {
  try {
    const res = await putDataAPI(`cards/${id}`, data);

    const updatedCard = res.data;
    let newBoard = cloneDeep(board);

    const columnData = newBoard.columns.find(column => column._id === updatedCard.columnId);

    const indexToUpdate = columnData.cards.findIndex(card => card._id === updatedCard._id);

    columnData.cards.splice(indexToUpdate, 1, updatedCard);

    return { data: newBoard };
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const deleteCard = createAsyncThunk("card/deleteCard", async ({ board, card }, { rejectWithValue }) => {
  try {
    await deleteDataAPI(`cards/${card._id}`);

    let newBoard = cloneDeep(board);

    const columnData = newBoard.columns.find(column => column._id === card.columnId);

    columnData.cards = columnData.cards.filter(c => c._id !== card._id);

    return { data: newBoard };
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const createComment = createAsyncThunk("card/createComment", async (data, { rejectWithValue }) => {
  try {
    const res = await postDataAPI(`comments`, data);

    return res;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const deleteComment = createAsyncThunk("card/deleteCommentById", async (id, { rejectWithValue }) => {
  try {
    await deleteDataAPI(`comments/${id}`);

    return { data: id }
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const getCommentsFromCardId = createAsyncThunk("card/getCommentsFromCardId", async (cardId, { rejectWithValue }) => {
  try {
    const res = await getDataAPI(`comments/card/${cardId}`);

    return res;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});

export const updateComment = createAsyncThunk("card/updateComment", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await putDataAPI(`comments/${id}`, data);

    return res;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});