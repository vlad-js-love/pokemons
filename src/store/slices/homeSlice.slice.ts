import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
 currentPage: number
}

const initialState: IInitialState = {
  currentPage: 1
};

export const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {
    setCurrentPage(state, actions: PayloadAction<number>) {
      state.currentPage = actions.payload;
    },
  },
});

export const { reducer, actions } = homeSlice;
