import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface stateInterface {
  entities: {};
  status: 'idle' | 'loading' | 'loaded';
}

const initialState: stateInterface = {
  entities: {},
  status: 'idle',
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.entities = { ...action.payload };
        state.status = 'loaded';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.entities = { ...action.payload };
        state.status = 'loaded';
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.entities = { ...action.payload };
        state.status = 'loaded';
      })
      .addCase(fetchAuthors.pending, (state) => {
        state.status = 'loading';
      });
  },
});

export const fetchCategories = createAsyncThunk(
  'books/fetchCategories',
  async (pagePayload: {
    sortKey: string;
    perPage: number;
    activePage: number;
    filterBy: string;
  }) => {
    const { sortKey, perPage, activePage, filterBy } = pagePayload;
    const offset: number = activePage * perPage - perPage;

    const response = await fetch(
      `https://openlibrary.org/subjects/${sortKey}.json?limit=${perPage}&offset=${offset}${
        filterBy === 'relevance' ? '' : `&sort=${filterBy}`
      }`
    );
    return await response.json();
  }
);

export const fetchAuthors = createAsyncThunk(
  'books/fetchAuthors',
  async (pagePayload: {
    sortKey: string;
    perPage: number;
    activePage: number;
  }) => {
    const { sortKey, perPage, activePage } = pagePayload;
    const offset: number = activePage * perPage - perPage;

    const response = await fetch(
      `https://openlibrary.org${sortKey}/works.json?limit=${perPage}&offset=${offset}`
    );
    return await response.json();
  }
);

export const fetchRecommendations = createAsyncThunk(
  'books/fetchRecommendations',
  async (pagePayload: { perPage: number; activePage: number }) => {
    const { perPage, activePage } = pagePayload;
    const response = await fetch(
      `https://openlibrary.org/people/mekBot/books/want-to-read.json?limit=${perPage}&page=${activePage}`
    );

    const json = await response.json();
    const entries = json.reading_log_entries;
    const works = entries.map((entity: any) => entity.work);

    return { ...json, reading_log_entries: [...works] };
  }
);

export default booksSlice.reducer;
