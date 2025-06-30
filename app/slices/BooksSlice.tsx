import { createSlice } from "@reduxjs/toolkit";
import { stateInterface } from "../types/fetchTypes";
import {
  fetchRecommendations,
  fetchAuthors,
  fetchCategories,
} from "../fetchThunks";

const initialState: stateInterface = {
  entities: {},
  status: "idle",
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.entities = { ...action.payload };
        state.status = "loaded";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.entities = { ...action.payload };
        state.status = "loaded";
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.entities = { ...action.payload };
        state.status = "loaded";
      })
      .addCase(fetchAuthors.pending, (state) => {
        state.status = "loading";
      });
  },
});

export default booksSlice.reducer;
