/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { WordType } from '../../../interfaces';
import {
  addToCollection,
  removeFromCollection,
} from '../../../store/collection/collectionSlice';

function IsItCollectionedCheckbox({ wordData }: { wordData: WordType }) {
  const { collection } = useAppSelector((state) => state.persist.collection);
  const isItInCollection = !!collection.filter(
    (word) => word.id === wordData.id
  ).length;

  const { register, handleSubmit, watch } = useForm<{
    collectioned: boolean;
  }>({
    defaultValues: {
      collectioned: isItInCollection,
    },
  });

  const isItChecked = watch('collectioned');
  const dispatch = useAppDispatch();

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <label htmlFor="collectioned">
        {isItChecked ? 'remove from Collection' : 'add to Collection'}
        <input
          {...register('collectioned', {
            onChange: (e) => {
              if (e.target.checked) {
                dispatch(addToCollection(wordData));
              } else {
                dispatch(removeFromCollection(wordData));
              }
            },
          })}
          type="checkbox"
          placeholder="email"
          id="collectioned"
        />
      </label>
    </form>
  );
}

export default IsItCollectionedCheckbox;
