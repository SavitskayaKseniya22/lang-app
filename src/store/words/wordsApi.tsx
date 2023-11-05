import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TextBookValuesTypes, WordType } from '../../interfaces';

export const wordsApi = createApi({
  reducerPath: 'wordsApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://lang--app-default-rtdb.europe-west1.firebasedatabase.app/',
  }),
  endpoints: (builder) => ({
    getAllWords: builder.query<WordType[], TextBookValuesTypes>({
      query: ({ group, page }) => ({
        url: `/${group}/${page}.json`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllWordsQuery } = wordsApi;
