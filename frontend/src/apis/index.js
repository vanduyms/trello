import axios from "axios";
import { API_ROOT } from "../utils/constants";

export const loginAPI = async (data, token) => {
  const request = await axios.post(`${API_ROOT}/v1/login`, data, {
    headers: { Authorization: token }
  });

  return request;
}

export const fetchBoardDetailsAPI = async (boardId, token) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`, {
    headers: { Authorization: token }
  });

  return request.data;
}

export const updateBoardDetailsAPI = async (boardId, updateData, token) => {
  const request = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData, {
    headers: { Authorization: token }
  });

  return request.data;
}

export const moveCardToDifferentColumnAPI = async (updateData, token) => {
  const request = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData, {
    headers: { Authorization: token }
  });

  return request.data;
}

export const createNewColumnAPI = async (newColumnData, token) => {
  const request = await axios.post(`${API_ROOT}/v1/columns`, newColumnData, {
    headers: { Authorization: token }
  });

  return request.data;
}

export const updateColumnDetailsAPI = async (columnId, updateData, token) => {
  const request = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData, {
    headers: { Authorization: token }
  });

  return request.data;
}

export const deleteColumnDetailsAPI = async (columnId, token) => {
  const request = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`, {
    headers: { Authorization: token }
  });

  return request.data;
}

export const createNewCardAPI = async (newCardData, token) => {
  const request = await axios.post(`${API_ROOT}/v1/cards`, newCardData, {
    headers: { Authorization: token }
  });

  return request.data;
}
