import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSearch } from "../fetchThunks";

type searchItemsType =
  | [
      {
        author_key: string[];
        author_name: string[];
        title: string;
        key: string;
      }
    ]
  | [];

interface stateInterface {
  searchedItems: searchItemsType;
  isSearching: boolean;
}

const initialState: stateInterface = {
  searchedItems: [],
  isSearching: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setIsSearching(state, action: PayloadAction<boolean>) {
      state.isSearching = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.searchedItems = [...action.payload] as searchItemsType;
    });
  },
});

export const { setIsSearching } = searchSlice.actions;
export default searchSlice.reducer;
