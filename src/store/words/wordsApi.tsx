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
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useGetAllWordsQuery } = wordsApi;
