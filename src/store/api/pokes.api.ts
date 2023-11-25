import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ReqPokes, ReqTypes } from "../../types/pokes.types";

export const pokesApi = createApi({
  reducerPath: "pokesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),
  endpoints: (build) => ({
    getPokes: build.query<ReqPokes, number>({
      query: (offset) => ({
        url: `pokemon?offset=${offset}&limit=20`,
      }),
    }),
    getPoke: build.query<any, string>({
      query: (url) => ({
        url: url,
      }),
    }),
    getPokeById: build.query<any, string>({
      query: (id) => ({
        url: `pokemon/${id}`,
      }),
    }),
    findByName: build.query<any, string>({
      query: (search: string) => ({
        url: `pokemon/${search}`,
      }),
    }),
    getPokesTypes: build.query<ReqTypes, any>({
      query: () => ({
        url: `type`,
      }),
    }),
    getPokesByType: build.query<any, string>({
      query: (type) => ({
        url: `type/${type}`,
      }),
    }),
  }),
});

export const {
  useLazyGetPokesQuery,
  useGetPokeQuery,
  useLazyGetPokeByIdQuery,
  useLazyFindByNameQuery,
  useGetPokesTypesQuery,
  useLazyGetPokesByTypeQuery,
} = pokesApi;
