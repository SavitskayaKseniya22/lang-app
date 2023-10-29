import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TextBookValuesTypes, WordType } from '../../interfaces';

export const wordsApi = createApi({
  reducerPath: 'wordsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
  }),
  endpoints: (builder) => ({
    getAllWords: builder.query<WordType[], TextBookValuesTypes>({
      query: ({ group, page }) => ({
        url: `/words?page=${page}&group=${group}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllWordsQuery } = wordsApi;
