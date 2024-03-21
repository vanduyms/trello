import { createAsyncThunk } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { putDataAPI } from "~/apis/fetchData";

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
    console.log(error);
    if (error.response && error.response.data.msg) {
      return rejectWithValue(error.response.data)
    } else {
      return rejectWithValue(error.response);
    }
  }
});