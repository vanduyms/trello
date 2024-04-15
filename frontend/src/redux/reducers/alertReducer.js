import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  invitations: [],
  comments: [],
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase()
  }
});

export default alertSlice.reducer;