import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const fetchSearch = createAsyncThunk(
  'search/fetchSearch',
  async (bookName: string) => {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${bookName}&fields=*,availability&limit=5`
    );
    const json = await response.json();
    return json.docs;
  }
);

export const { setIsSearching } = searchSlice.actions;
export default searchSlice.reducer;
