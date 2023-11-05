/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ActiveUserTypes } from '../../interfaces';

export interface AuthState {
  user: ActiveUserTypes | undefined;
  timeOfLogin: number | undefined;
}

const initialState: AuthState = {
  user: undefined,
  timeOfLogin: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ActiveUserTypes>) => {
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
