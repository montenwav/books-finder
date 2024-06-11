import { createSlice } from '@reduxjs/toolkit';

interface stateInterface {
  perPage: string
}

const getPerPage = localStorage.getItem('perPageStorage');

const initialState: stateInterface = {
  perPage: getPerPage ? getPerPage : '12',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changePerPage(state, action) {
      return { ...state, perPage: action.payload };
    },
  },
});

export const { changePerPage } = filtersSlice.actions;
export default filtersSlice.reducer;