import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const perPage = Number(localStorage.getItem('perPage')) || 12;
const filterBy = localStorage.getItem('filterBy');

interface stateInterface {
  perPage: number;
  filterBy: string;
}

const initialState: stateInterface = {
  perPage: perPage,
  filterBy: 'relevance' || filterBy,
};

export const filtersSlice = createSlice({
  name: 'filters',
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
