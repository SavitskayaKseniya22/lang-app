import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wordApi = createApi({
  reducerPath: 'wordApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/',
  }),
  endpoints: (builder) => ({
    getWordImage: builder.query({
      query: (partOfUrl: string) => ({
        url: `/${partOfUrl}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetWordImageQuery } = wordApi;
