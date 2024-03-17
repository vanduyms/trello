import axios from "~/setup/axios";

export const getDataAPI = async (url) => {
  const res = axios.get(`/v1/${url}`);
  return res;
}

export const deleteDataAPI = async (url) => {
  const res = axios.delete(`/v1/${url}`);
  return res;
}

export const postDataAPI = async (url, post) => {
  const res = axios.post(`/v1/${url}`, post);
  return res;
}

export const putDataAPI = async (url, post) => {
  const res = axios.put(`/v1/${url}`, post);
  return res;
}

export const patchDataAPI = async (url, post) => {
  const res = axios.patch(`/v1/${url}`, post);
  return res;
}

export const postAPI = async (url) => {
  const res = axios.post(`/v1/${url}`);
  return res;
}