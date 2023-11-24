import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ReqFindByType = {
  
}

interface IInitialState {
  type: string;
  result: any | null;
}

const initialState: IInitialState = {
  type: "",
  result: null,
};

export const pokeFindByTypeSlice = createSlice({
  name: "pokeFindByTypeSlice",
  initialState,
  reducers: {
    setPokemonsByType(state, actions: PayloadAction<any>){
      
    }
  },
});

export const { reducer, actions } = pokeFindByTypeSlice;
