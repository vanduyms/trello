import axios from "axios";
import { API_ROOT } from "../utils/constants";

export const getDataAPI = async (url, token) => {
  const res = axios.get(`${API_ROOT}/v1/${url}`, {
    headers: { Authorization: token }
  });
  return res;
}

export const deleteDataAPI = async (url, token) => {
  const res = axios.delete(`${API_ROOT}/v1/${url}`, {
    headers: { Authorization: token }
  });
  return res;
}

export const postDataAPI = async (url, post, token) => {
  const res = axios.post(`${API_ROOT}/v1/${url}`, post, {
    headers: { Authorization: token }
  });
  return res;
}

export const putDataAPI = async (url, post, token) => {
  const res = axios.put(`${API_ROOT}/v1/${url}`, post, {
    headers: { Authorization: token }
  });
  return res;
}

export const patchDataAPI = async (url, post, token) => {
  const res = axios.patch(`${API_ROOT}/v1/${url}`, post, {
    headers: { Authorization: token }
  });
  return res;
}

export const postAPI = async (url, token) => {
  const res = axios.post(`${API_ROOT}/v1/${url}`, {
    headers: { Authorization: token }
  });
  return res;
}