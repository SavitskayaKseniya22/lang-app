/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  CollectionLikeObjectType,
  CollectionType,
  WordType,
} from '../../../interfaces';
import {
  useAddWordToCollectionMutation,
  useRemoveFromCollectionMutation,
} from '../../../store/userData/UserDataApi';
import { useAddToUserWordsMutation } from '../../../store/results/resultsApi';

const StyledCollectionControl = styled('label')`
  display: flex;
  text-align: center;
`;

function CollectionControl({
  wordData,
  collectionType,
  collection,
  userId,
}: {
  wordData: WordType;
  collectionType: CollectionType;
  collection: CollectionLikeObjectType;
  userId: string;
}) {
  const [addWordToCollection] = useAddWordToCollectionMutation();
  const [removeFromCollection] = useRemoveFromCollectionMutation();
  const [addToUserWords] = useAddToUserWordsMutation();

  const isItInCollection =
    (collection &&
      collection[collectionType] &&
      wordData.id in collection[collectionType]) ||
    false;

  const isItDifficult =
    (collection &&
      collection[CollectionType.DIFFICULT] &&
      wordData.id in collection[CollectionType.DIFFICULT]) ||
    false;

  const isItLearned =
    (collection &&
      collection[CollectionType.LEARNED] &&
      wordData.id in collection[CollectionType.LEARNED]) ||
    false;

  const { register, watch } = useForm<{
    [type: string]: boolean;
  }>({
    defaultValues: {
      [collectionType]: isItInCollection,
    },
  });

  const isItChecked = watch(collectionType);

  return (
    <StyledCollectionControl htmlFor={collectionType}>
      {isItChecked
        ? `Remove from ${collectionType}`
        : `Add to ${collectionType}`}
      <input
        {...register(collectionType, {
          onChange: (e) => {
            if (e.target.checked) {
              addWordToCollection({
                userId,
                wordData: { [wordData.id]: wordData },
                collectionType,
              });

              if (collectionType === CollectionType.LEARNED) {
                addToUserWords({
                  userId,
                  data: {
                    [wordData.id]: {
                      ...wordData,
                      guessed: isItDifficult ? 5 : 3,
                    },
                  },
                });
              }

              if (collectionType === CollectionType.DIFFICULT && isItLearned) {
                addToUserWords({
                  userId,
                  data: {
                    [wordData.id]: {
                      ...wordData,
                      guessed: 5,
                    },
                  },
                });
              }
            } else {
              removeFromCollection({
                userId,
                wordId: wordData.id,
                collectionType,
              });

              if (collectionType === CollectionType.LEARNED) {
                addToUserWords({
                  userId,
                  data: { [wordData.id]: { ...wordData, guessed: 0 } },
                });
              }

              if (collectionType === CollectionType.DIFFICULT) {
                addToUserWords({
                  userId,
                  data: {
                    [wordData.id]: {
                      ...wordData,
                      guessed: isItLearned ? 3 : 0,
                    },
                  },
                });
              }
            }
          },
        })}
        type="checkbox"
        id={collectionType}
      />
    </StyledCollectionControl>
  );
}

export default CollectionControl;
