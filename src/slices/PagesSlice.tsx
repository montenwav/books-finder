import { createSlice } from '@reduxjs/toolkit';

interface stateInterface {
  pagesArr: { id: number; active: boolean }[];
  activePage: number
}

const initialState: stateInterface = {
  pagesArr: [
    { id: 1, active: true },
    { id: 2, active: false },
    { id: 3, active: false },
    { id: 4, active: false },
    { id: 5, active: false },
  ],
  activePage: 1
};

export const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    changePage(state, action) {
      const { numberOfPages, activePage } = action.payload;

      return {
        ...state,
        pagesArr:
          activePage < 3 || activePage > numberOfPages - 2
            ? state.pagesArr.map((page) => {
                if (page.id === activePage) return { ...page, active: true };
                return { ...page, active: false };
              })
            : [
                { id: activePage - 2, active: false },
                { id: activePage - 1, active: false },
                { id: activePage, active: true },
                { id: activePage + 1, active: false },
                { id: activePage + 2, active: false },
              ],
        activePage: activePage,
      };
    },
  },
});

export const { changePage } = pagesSlice.actions;
export default pagesSlice.reducer;