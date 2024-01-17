import React from 'react';
import styled from 'styled-components';
import { StyledMain } from '../../styled/SharedStyles';
import { useAppSelector } from '../../store/store';
import { CollectionType, WordWithIdType } from '../../interfaces';
import Spinner from '../../components/spinner/Spinner';
import CollectionPart from './components/CollectionPart';
import {
  useAddToUserWordsMutation,
  useGetUserWordsCollectionsQuery,
} from '../../store/userWordsApi';

export const StyledCollectionList = styled('ul')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 2;
  width: 100%;
`;

export const StyledRemoveAllButton = styled('button')`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  color: rgb(231, 111, 81);
`;

function Collection() {
  const { user } = useAppSelector((state) => state.persist.auth);

  const { data, isLoading, isSuccess } = useGetUserWordsCollectionsQuery({
    userId: user!.localId,
    tokenId: user!.idToken,
  });

  const [addToUserWords] = useAddToUserWordsMutation();

  if (isLoading) return <Spinner />;

  if (isSuccess) {
    return (
      <StyledMain>
        <h2>Collection</h2>
        <StyledCollectionList>
          {!!data[CollectionType.DIFFICULT].length && (
            <CollectionPart data={data} type={CollectionType.DIFFICULT} />
          )}
          {!!data[CollectionType.SELECTED].length && (
            <CollectionPart data={data} type={CollectionType.SELECTED} />
          )}
          {!!data[CollectionType.LEARNED].length && (
            <CollectionPart data={data} type={CollectionType.LEARNED} />
          )}
        </StyledCollectionList>

        <StyledRemoveAllButton
          type="button"
          onClick={() => {
            if (data) {
              const updatedWords: WordWithIdType = {} as WordWithIdType;

              data.all.forEach((word) => {
                Object.assign(updatedWords, {
                  [word.id]: {
                    ...word,
                    selected: false,
                    learned: false,
                    difficult: false,
                    guessed: 0,
                  },
                });
              });

              addToUserWords({
                userId: user!.localId,
                data: updatedWords,
                tokenId: user!.idToken,
              });
            }
          }}
        >
          <i className="fa-regular fa-trash-can" />
        </StyledRemoveAllButton>
      </StyledMain>
    );
  }
  return <>no Data</>;
}

export default Collection;
