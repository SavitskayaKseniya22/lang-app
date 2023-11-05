import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';

import { firebaseConfig } from '../../firebase';

import {
  AuthErrorTypes,
  ActiveUserListDataTypes,
  BasicUserCredentials,
} from '../../interfaces';
import { transformAuthError } from '../../utils';
import { setUser, resetUser } from './authSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://identitytoolkit.googleapis.com/v1/accounts',
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: ({ email, password }: BasicUserCredentials) => ({
        url: `:signUp?key=${firebaseConfig.apiKey}`,
        method: 'POST',
        body: {
          email,
          password,
          returnSecureToken: true,
        },
      }),
      transformErrorResponse: (response) => transformAuthError(response),
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('You are registered successfully');
        } catch (err) {
          if (err && typeof err === 'object' && 'error' in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
          }
        }
      },
    }),
    signIn: builder.mutation({
      query: ({ email, password }: BasicUserCredentials) => ({
        url: `:signInWithPassword?key=${firebaseConfig.apiKey}`,
        method: 'POST',
        body: {
          email,
          password,
          returnSecureToken: true,
        },
      }),
      transformErrorResponse: (response) => transformAuthError(response),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          toast.success("You've successfully logged in");
        } catch (err) {
          if (err && typeof err === 'object' && 'error' in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
          }
        }
      },
    }),
    getUserData: builder.mutation({
      query: (idToken: string) => ({
        url: `:lookup?key=${firebaseConfig.apiKey}`,
        method: 'POST',
        body: {
          idToken,
        },
      }),
      transformErrorResponse: (response) => transformAuthError(response),
      transformResponse: (response) =>
        (response as ActiveUserListDataTypes).users[0],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          toast.success('data uploaded');
        } catch (err) {
          if (err && typeof err === 'object' && 'error' in err) {
            const { message, code } = (err as AuthErrorTypes).error;
            toast.error(`${code}: ${message}`);
            dispatch(resetUser());
          }
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useGetUserDataMutation } =
  authApi;
