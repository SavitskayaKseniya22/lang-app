/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WordType } from '../../interfaces';

export interface CollectionState {
  collection: WordType[];
}

const initialState: CollectionState = {
  collection: [],
};

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setCollection: (state, action: PayloadAction<WordType[]>) => {
      state.collection = action.payload;
    },

    addToCollection: (state, action: PayloadAction<WordType>) => {
      state.collection = [...state.collection, action.payload];
    },

    removeFromCollection: (state, action: PayloadAction<WordType>) => {
      state.collection = state.collection.filter(
        (word) => word.id !== action.payload.id
      );
    },

    resetCollection: (state) => {
      state.collection = [];
    },
  },
});

export const { addToCollection, removeFromCollection, resetCollection } =
  collectionSlice.actions;

export default collectionSlice.reducer;
