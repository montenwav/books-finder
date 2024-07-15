import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  authorsType,
  categoriesType,
  recommendationType,
} from './types/fetchTypes';

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
    return (await response.json()) as categoriesType;
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
    return (await response.json()) as authorsType;
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
    const works = entries.map(
      (entity: { work: { title: string; cover_id: number } }) => entity.work
    );

    return { ...json, reading_log_entries: [...works] } as recommendationType;
  }
);

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
