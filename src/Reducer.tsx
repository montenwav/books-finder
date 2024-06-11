import { configureStore } from "@reduxjs/toolkit";
import {booksSlice} from './slices/BooksSlice'
import {pagesSlice} from './slices/PagesSlice'
import {filtersSlice} from './slices/FiltersSlice'

export const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
    pages: pagesSlice.reducer,
    filters: filtersSlice.reducer,
  }
})