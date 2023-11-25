import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  typePoke: string | null;
  result: any | null;
}

const initialState: IInitialState = {
  typePoke: "",
  result: null,
};

export const pokeFindByTypeSlice = createSlice({
  name: "pokeFindByTypeSlice",
  initialState,
  reducers: {
    setTypePoke(state, actions: PayloadAction<string | null>) {
      state.typePoke = actions.payload;
    },
    setPokemonsByType(state, actions: PayloadAction<any>) {
      state.result = actions.payload;
    },
  },
});

export const { reducer, actions } = pokeFindByTypeSlice;
