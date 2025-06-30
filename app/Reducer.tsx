import { configureStore } from '@reduxjs/toolkit';
import { booksSlice } from './slices/BooksSlice';
import { pagesSlice } from './slices/PagesSlice';
import { filtersSlice } from './slices/FiltersSlice';
import { adaptiveSlice } from './slices/AdaptiveSlice';
import { searchSlice } from './slices/SearchSlice';

export const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
    pages: pagesSlice.reducer,
    filters: filtersSlice.reducer,
    adaptive: adaptiveSlice.reducer,
    search: searchSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
