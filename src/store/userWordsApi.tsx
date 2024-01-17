import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  CollectionLikeArraysType,
  CollectionType,
  FirebaseErrorTypes,
  UserIdType,
  WordIdType,
  WordWithIdDataType,
  WordWithIdType,
} from '../interfaces';
import { resetUser } from './auth/authSlice';

export function handleError(
  err: unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: ThunkDispatch<any, any, AnyAction>
) {
  if (err && typeof err === 'object' && 'error' in err) {
    const { status, data } = (err as FirebaseErrorTypes).error;
    toast.error(`${status}: ${data.error}`);
    dispatch(resetUser());
  } else {
    toast.error(`Not specific error`);
  }
}

export const userWordsApi = createApi({
  reducerPath: 'userWordsApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://lang--app-default-rtdb.europe-west1.firebasedatabase.app/users',
  }),
  tagTypes: ['UserCollection', 'UserWord'],

  endpoints: (builder) => ({
    createUserData: builder.mutation<
      UserIdType,
      UserIdType & { tokenId: string }
    >({
      query: ({ userId, tokenId }) => ({
        url: `/${userId}.json`,
        body: {
          userId,
          words: {},
        },
        method: 'PUT',
        params: { auth: tokenId },
      }),
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleError(err, dispatch);
        }
      },
    }),

    getUserWords: builder.query<
      WordWithIdType | null,
      UserIdType & { tokenId: string }
    >({
      query: ({ userId, tokenId }) => ({
        url: `/${userId}/words/.json`,
        method: 'GET',
        params: { auth: tokenId },
      }),
      keepUnusedDataFor: 0,
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleError(err, dispatch);
        }
      },
    }),

    getUserWord: builder.query<
      WordWithIdDataType | null,
      UserIdType & WordIdType & { tokenId: string }
    >({
      query: ({ userId, wordId, tokenId }) => ({
        url: `/${userId}/words/${wordId}.json`,
        method: 'GET',
        params: { auth: tokenId },
      }),
      keepUnusedDataFor: 0,
      providesTags: ['UserWord'],
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleError(err, dispatch);
        }
      },
    }),

    getUserWordsCollections: builder.query<
      CollectionLikeArraysType,
      UserIdType & { tokenId: string }
    >({
      query: ({ userId, tokenId }) => ({
        url: `/${userId}/words/.json`,
        method: 'GET',
        params: { auth: tokenId },
      }),
      keepUnusedDataFor: 0,
      providesTags: ['UserCollection'],
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleError(err, dispatch);
        }
      },

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
      UserIdType & { data: WordWithIdType } & { tokenId: string }
    >({
      query: ({ userId, data, tokenId }) => ({
        url: `/${userId}/words/.json`,
        body: data,
        method: 'PATCH',
        params: { auth: tokenId },
      }),
      invalidatesTags: ['UserCollection'],
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleError(err, dispatch);
        }
      },
    }),

    updateUserWord: builder.mutation<
      WordWithIdType,
      UserIdType &
        WordIdType & { data: WordWithIdDataType } & { tokenId: string }
    >({
      query: ({ userId, data, wordId, tokenId }) => ({
        url: `/${userId}/words/${wordId}/.json`,
        body: data,
        method: 'PATCH',
        params: { auth: tokenId },
      }),
      invalidatesTags: ['UserCollection', 'UserWord'],
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (err) {
          handleError(err, dispatch);
        }
      },
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
