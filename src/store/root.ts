import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as pokesReducer } from "./slices/pokes.slice";
// import { authApi } from './api/auth';
import { pokesApi } from "./api/pokes.api";

const mainReducer = combineReducers({
  [pokesApi.reducerPath]: pokesApi.reducer,
  pokesReducer,
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
