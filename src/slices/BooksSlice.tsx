import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface stateInterface {
  entities: object;
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
      })
  },
});

export const fetchCategories = createAsyncThunk(
  'books/fetchCategories',
  async (value) => {
    const response = await fetch(
      `https://openlibrary.org/subjects/${value}.json`
    );
    const json = await response.json();
    const works = json.works;

    return works;
  }
);

export const fetchAuthors = createAsyncThunk(
  'books/fetchAuthors',
  async (value) => {
    const response = await fetch(
      `https://openlibrary.org${value}/works.json`
    );
    const json = await response.json();
    const works = json.entries;
    return works;
  }
);

export const fetchRecommendations = createAsyncThunk(
  'books/fetchRecommendations',
  async (pagePayload: {perPage: string, activePage: number}) => {
    const {perPage, activePage} = pagePayload
    try {
      const response = await fetch(
        `https://openlibrary.org/people/mekBot/books/want-to-read.json?limit=${perPage}&page=${activePage}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const json = await response.json();
      const entries = json.reading_log_entries;
      const works = entries.map((entity: any) => entity.work);
      return {...json, reading_log_entries: [...works]}
    } catch (err) {
      console.error(`Promise error: ${err}`);
    }
  }
);

export default booksSlice.reducer;
