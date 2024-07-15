import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSearch } from '../fetchThunks';

interface stateInterface {
  searchedItems:
    | [
        {
          author_key: string[];
          author_name: string[];
          title: string;
          key: string;
        }
      ]
    | any[];
  isSearching: boolean;
}

const initialState: stateInterface = {
  searchedItems: [],
  isSearching: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setIsSearching(state, action: PayloadAction<boolean>) {
      state.isSearching = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.searchedItems = [...action.payload];
    });
  },
});

export const { setIsSearching } = searchSlice.actions;
export default searchSlice.reducer;
