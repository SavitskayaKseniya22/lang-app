import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AuthData,
  BasicUserCredentials,
  ExtendedUserCredentials,
} from '../../interfaces';
import { setUser } from './authSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body: ExtendedUserCredentials) => ({
        url: `/users`,
        method: 'POST',
        body,
      }),
    }),
    signIn: builder.mutation<AuthData, BasicUserCredentials>({
      query: (body) => ({
        url: `/signin`,
        method: 'POST',
        body,
      }),
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
