import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CollectionLikeObjectType,
  CollectionType,
  UserIdType,
  WordIdType,
  WordType,
} from '../../interfaces';

export const userDataApi = createApi({
  reducerPath: 'userDataApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://lang--app-default-rtdb.europe-west1.firebasedatabase.app/users',
  }),
  tagTypes: ['Collection'],

  endpoints: (builder) => ({
    createUserData: builder.mutation<UserIdType, UserIdType>({
      query: ({ userId }) => ({
        url: `/${userId}.json`,
        body: {
          userId,
          results: {
            words: [],
            games: [],
          },
          collections: {
            [CollectionType.DIFFICULT]: {},
            [CollectionType.LEARNED]: {},
            [CollectionType.SELECTED]: {},
          },
        },
        method: 'PUT',
      }),
    }),

    getUserCollection: builder.query<CollectionLikeObjectType, UserIdType>({
      query: ({ userId }) => ({
        url: `/${userId}/collections/.json`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
      providesTags: ['Collection'],
    }),

    clearUserCollection: builder.mutation<null, UserIdType>({
      query: ({ userId }) => ({
        url: `/${userId}/collections/.json`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Collection'],
    }),

    clearPartOfCollection: builder.mutation<
      null,
      UserIdType & { collectionType: CollectionType }
    >({
      query: ({ userId, collectionType }) => ({
        url: `/${userId}/collections/${collectionType}/.json`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Collection'],
    }),

    removeFromCollection: builder.mutation<
      null,
      UserIdType & WordIdType & { collectionType: CollectionType }
    >({
      query: ({ userId, wordId, collectionType }) => ({
        url: `/${userId}/collections/${collectionType}/${wordId}.json`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Collection'],
    }),

    addWordToCollection: builder.mutation<
      WordType,
      UserIdType & {
        wordData: { [wordId: string]: WordType };
        collectionType: CollectionType;
      }
    >({
      query: ({ wordData, userId, collectionType }) => ({
        url: `/${userId}/collections/${collectionType}/.json`,
        method: 'PATCH',
        body: wordData,
      }),
      invalidatesTags: ['Collection'],
    }),
  }),
});

export const {
  useCreateUserDataMutation,
  useGetUserCollectionQuery,
  useAddWordToCollectionMutation,
  useClearPartOfCollectionMutation,
  useClearUserCollectionMutation,
  useRemoveFromCollectionMutation,
} = userDataApi;
