import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TextBookValuesTypes } from '../../interfaces';

export const wordsApi = createApi({
  reducerPath: 'wordsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
  }),
  endpoints: (builder) => ({
    getAllWords: builder.query({
      query: ({ group, page }: TextBookValuesTypes) => ({
        url: `/words?page=${page}&group=${group}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllWordsQuery } = wordsApi;
