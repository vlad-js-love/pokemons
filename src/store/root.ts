import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as pokeFindByTypeReducer } from "./slices/pokeFindByType.slice";
import { reducer as homeReducer } from "./slices/homeSlice.slice";
import { pokesApi } from "./api/pokes.api";

const mainReducer = combineReducers({
  [pokesApi.reducerPath]: pokesApi.reducer,
  pokeFindByTypeReducer,
  homeReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: mainReducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      pokesApi.middleware,
    ],
  });
};

export type StoreType = ReturnType<typeof setupStore>;
export type StateType = ReturnType<typeof mainReducer>;
export type DispatchType = StoreType["dispatch"];
