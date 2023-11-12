/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { CollectionType, WordType } from '../../../interfaces';
import { useAppSelector } from '../../../store/store';
import {
  useAddWordToCollectionMutation,
  useRemoveFromCollectionMutation,
} from '../../../store/userData/UserDataApi';

const StyledCollectionControl = styled('label')`
  display: flex;
  text-align: center;

  input {
    display: none;
  }
`;

function CollectionControl({
  wordData,
  type,
  collection = {},
}: {
  wordData: WordType;
  type: CollectionType;
  collection: { [id: string]: WordType };
}) {
  const { user } = useAppSelector((state) => state.persist.auth);
  const [addWordToCollection] = useAddWordToCollectionMutation();
  const [removeFromCollection] = useRemoveFromCollectionMutation();

  const isItInCollection = wordData.id in collection;

  const { register, watch } = useForm<{
    [type: string]: boolean;
  }>({
    defaultValues: {
      [type]: isItInCollection,
    },
  });

  const isItChecked = watch(type);

  return (
    <StyledCollectionControl htmlFor={type}>
      {isItChecked ? `Remove from ${type}` : `Add to ${type}`}
      <input
        {...register(type, {
          onChange: (e) => {
            if (e.target.checked) {
              addWordToCollection({
                userId: user!.localId,
                wordData,
                wordId: wordData.id,
                collectionType: type,
              });
            } else {
              removeFromCollection({
                userId: user!.localId,
                wordId: wordData.id,
                collectionType: type,
              });
            }
          },
        })}
        type="checkbox"
        placeholder="email"
        id={type}
      />
    </StyledCollectionControl>
  );
}

export default CollectionControl;
