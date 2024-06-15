import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface stateInterface {
  isOpenSort: boolean;
}

const initialState: stateInterface = {
  isOpenSort: true,
};

export const adaptiveSlice = createSlice({
  name: 'adaptive',
  initialState,
  reducers: {
    setIsOpenSort(state, action: PayloadAction<boolean>) {
      state.isOpenSort = action.payload;
    },
  },
});

export const { setIsOpenSort } = adaptiveSlice.actions;
export default adaptiveSlice.reducer;
