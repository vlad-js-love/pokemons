import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {

}

const initialState: IInitialState = {

};

export const pokesSlice = createSlice({
  name: "pokesSlice",
  initialState,
  reducers: {

  },
});

export const { reducer, actions } = pokesSlice;
