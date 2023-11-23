import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CollectionLikeArraysType,
  CollectionType,
  UserIdType,
  WordIdType,
  WordWithIdDataType,
  WordWithIdType,
} from '../interfaces';

export const userWordsApi = createApi({
  reducerPath: 'userWordsApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://lang--app-default-rtdb.europe-west1.firebasedatabase.app/users',
  }),
  tagTypes: ['UserCollection', 'UserWord'],

  endpoints: (builder) => ({
    createUserData: builder.mutation<UserIdType, UserIdType>({
      query: ({ userId }) => ({
        url: `/${userId}.json`,
        body: {
          userId,
          words: {},
        },
        method: 'PUT',
      }),
    }),

    getUserWords: builder.query<WordWithIdType | null, UserIdType>({
      query: ({ userId }) => ({
        url: `/${userId}/words/.json`,

        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),

    getUserWord: builder.query<
      WordWithIdDataType | null,
      UserIdType & WordIdType
    >({
      query: ({ userId, wordId }) => ({
        url: `/${userId}/words/${wordId}.json`,

        method: 'GET',
      }),
      keepUnusedDataFor: 0,
      providesTags: ['UserWord'],
    }),

    getUserWordsCollections: builder.query<
      CollectionLikeArraysType,
      UserIdType
    >({
      query: ({ userId }) => ({
        url: `/${userId}/words/.json`,

        method: 'GET',
      }),
      keepUnusedDataFor: 0,
      providesTags: ['UserCollection'],

      transformResponse: (response: WordWithIdType | null) => {
        if (response === null) {
          return {
            [CollectionType.DIFFICULT]: [],
            [CollectionType.LEARNED]: [],
            [CollectionType.SELECTED]: [],
            all: [],
          };
        }
        const collection = {
          [CollectionType.DIFFICULT]: Object.keys(response)
            .filter((word) => response[word][CollectionType.DIFFICULT])
            .map((word) => response[word]),
          [CollectionType.LEARNED]: Object.keys(response)
            .filter((word) => response[word][CollectionType.LEARNED])
            .map((word) => response[word]),
          [CollectionType.SELECTED]: Object.keys(response)
            .filter((word) => response[word][CollectionType.SELECTED])
            .map((word) => response[word]),
          all: Object.keys(response).map((word) => response[word]),
        };
        return collection;
      },
    }),

    addToUserWords: builder.mutation<
      WordWithIdType,
      UserIdType & { data: WordWithIdType }
    >({
      query: ({ userId, data }) => ({
        url: `/${userId}/words/.json`,
        body: data,
        method: 'PATCH',
      }),
      invalidatesTags: ['UserCollection'],
    }),

    updateUserWord: builder.mutation<
      WordWithIdType,
      UserIdType & WordIdType & { data: WordWithIdDataType }
    >({
      query: ({ userId, data, wordId }) => ({
        url: `/${userId}/words/${wordId}/.json`,
        body: data,
        method: 'PATCH',
      }),
      invalidatesTags: ['UserCollection', 'UserWord'],
    }),
  }),
});

export const {
  useGetUserWordsQuery,
  useAddToUserWordsMutation,
  useCreateUserDataMutation,
  useGetUserWordsCollectionsQuery,
  useGetUserWordQuery,
  useUpdateUserWordMutation,
} = userWordsApi;