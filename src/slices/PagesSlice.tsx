import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const activePageStore: number = Number(localStorage.getItem('activePage')) || 1

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
  activePage: activePageStore || 1
};

export const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    changePage(state, action: PayloadAction<{numberOfPages?: number, activePage: number}>) {
      const { numberOfPages, activePage } = action.payload;

      return {
        ...state,
        pagesArr:
        numberOfPages && activePage > numberOfPages - 2
            ? state.pagesArr.map((page) => {
                if (page.id === activePage) return { ...page, active: true };
                return { ...page, active: false };
              })
            : [
                { id: activePage <= 2 ? 1 : activePage - 2, active: activePage === 1 ? true : false },
                { id: activePage <= 2 ? 2 : activePage - 1, active: activePage === 2 ? true : false },
                { id: activePage <= 2 ? 3 : activePage, active: activePage <= 2 ? false : true },
                { id: activePage <= 2 ? 4 : activePage + 1, active: false },
                { id: activePage <= 2 ? 5 : activePage + 2, active: false },
              ],
        activePage: activePage,
      };
    },
  },
});

export const { changePage } = pagesSlice.actions;
export default pagesSlice.reducer;