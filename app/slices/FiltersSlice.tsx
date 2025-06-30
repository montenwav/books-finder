"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface stateInterface {
  perPage: number;
  filterBy: string;
}

let perPage: number = 12;
let filterBy: string = "relevance";

if (typeof window !== "undefined") {
  perPage = JSON.parse(localStorage.getItem("perPage")!) ?? 12;
  filterBy = localStorage.getItem("filterBy") ?? "relevance";
}

const initialState: stateInterface = {
  perPage: perPage,
  filterBy: filterBy,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setPerPage(state, action: PayloadAction<number>) {
      state.perPage = action.payload;
    },
    setFilterBy(state, action: PayloadAction<string>) {
      state.filterBy = action.payload;
    },
  },
});

export const { setPerPage, setFilterBy } = filtersSlice.actions;
export default filtersSlice.reducer;
