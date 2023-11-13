import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserIdType, WordWithIdType } from '../../interfaces';

export const resultsApi = createApi({
  reducerPath: 'resultsApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://lang--app-default-rtdb.europe-west1.firebasedatabase.app/users',
  }),

  endpoints: (builder) => ({
    getUserWords: builder.query<WordWithIdType, UserIdType>({
      query: ({ userId }) => ({
        url: `/${userId}/results/words/.json`,

        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),
    setUserWords: builder.mutation<
      WordWithIdType,
      UserIdType & { data: WordWithIdType }
    >({
      query: ({ userId, data }) => ({
        url: `/${userId}/results/words/.json`,
        body: data,
        method: 'PUT',
      }),
    }),
    addToUserWords: builder.mutation<
      WordWithIdType,
      UserIdType & { data: WordWithIdType }
    >({
      query: ({ userId, data }) => ({
        url: `/${userId}/results/words/.json`,
        body: data,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetUserWordsQuery,
  useSetUserWordsMutation,
  useAddToUserWordsMutation,
} = resultsApi;
