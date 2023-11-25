import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  typePoke: string | null;
  result: any | null;
  isFetching: boolean;
}

const initialState: IInitialState = {
  typePoke: "",
  result: null,
  isFetching: false,
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
    setFetching(state, actions: PayloadAction<boolean>) {
      state.isFetching = actions.payload;
    },
  },
});

export const { reducer, actions } = pokeFindByTypeSlice;
