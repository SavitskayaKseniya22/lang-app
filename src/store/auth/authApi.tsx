import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { firebaseConfig } from '../../firebase';
import {
  FirebaseErrorTypes,
  BasicUserCredentials,
  ActiveUserTypes,
} from '../../interfaces';

import { setUser } from './authSlice';
import { transformAuthError } from '../../utils';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://identitytoolkit.googleapis.com/v1/accounts',
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<ActiveUserTypes, BasicUserCredentials>({
      query: ({ email, password }) => ({
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
            const { status, data } = (err as FirebaseErrorTypes).error;
            toast.error(`${status}: ${data.error}`);
          }
        }
      },
    }),
    signIn: builder.mutation<ActiveUserTypes, BasicUserCredentials>({
      query: ({ email, password }) => ({
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
            const { status, data } = (err as FirebaseErrorTypes).error;
            toast.error(`${status}: ${data.error}`);
          }
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
