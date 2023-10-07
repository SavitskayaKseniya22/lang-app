/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthData } from '../../interfaces';

export interface AuthState {
  timeOfLogin: number | undefined;
  user: AuthData | undefined;
}

const initialState: AuthState = {
  timeOfLogin: undefined,
  user: undefined,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthData>) => {
      state.user = action.payload;
      state.timeOfLogin = Date.now();
    },

    resetUser: (state) => {
      state.user = initialState.user;
      state.timeOfLogin = initialState.timeOfLogin;
    },
  },
});

export const { setUser, resetUser } = authSlice.actions;

export default authSlice.reducer;
