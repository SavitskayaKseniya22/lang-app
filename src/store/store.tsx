import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/es/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth/authSlice';
import collectionReducer from './collection/collectionSlice';
import { authApi } from './auth/authApi';
import { wordsApi } from './words/wordsApi';
import { userDataApi } from './userData/UserDataApi';

const persistConfig = {
  key: 'lang-app-root',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    collection: collectionReducer,
  })
);

const rootReducer = combineReducers({
  persist: persistedReducer,
  [authApi.reducerPath]: authApi.reducer,
  [wordsApi.reducerPath]: wordsApi.reducer,
  [userDataApi.reducerPath]: userDataApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(wordsApi.middleware)
      .concat(userDataApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
