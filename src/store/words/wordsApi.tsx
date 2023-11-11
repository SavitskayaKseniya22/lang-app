import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  TextBookValuesTypes,
  WordBaseValues,
  WordType,
} from '../../interfaces';
import { getRandom } from '../../utils';

export const wordsApi = createApi({
  reducerPath: 'wordsApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://lang--app-default-rtdb.europe-west1.firebasedatabase.app/words',
  }),
  endpoints: (builder) => ({
    getAllWords: builder.query<WordType[], TextBookValuesTypes>({
      query: ({ group, page }) => ({
        url: `/${group}/${page}.json`,
        method: 'GET',
      }),
    }),
    getRandomWords: builder.query<WordType[], { group: number }>({
      query: ({ group }) => ({
        url: `/${group}/${getRandom(0, WordBaseValues.MAXPAGE)}.json`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllWordsQuery, useGetRandomWordsQuery } = wordsApi;
