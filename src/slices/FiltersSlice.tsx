import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const perPage: number = Number(localStorage.getItem('perPage'))

interface stateInterface {
  perPage: number
}

const initialState: stateInterface = {
    perPage: 12 || perPage
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changePerPage(state, action: PayloadAction<number>) {
        state.perPage = action.payload
    },
  },
});

export const { changePerPage } = filtersSlice.actions;
export default filtersSlice.reducer;