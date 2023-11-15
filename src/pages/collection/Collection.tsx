import React from 'react';
import { StyledMain } from '../../styled/SharedStyles';
import { useAppSelector } from '../../store/store';
import { CollectionType, WordWithIdType } from '../../interfaces';
import Spinner from '../../components/spinner/Spinner';
import CollectionPart from './components/CollectionPart';
import {
  useAddToUserWordsMutation,
  useGetUserWordsCollectionsQuery,
} from '../../store/userWordsApi';

function Collection() {
  const { user } = useAppSelector((state) => state.persist.auth);

  const { data, isLoading, isSuccess } = useGetUserWordsCollectionsQuery({
    userId: user!.localId,
  });

  const [addToUserWords] = useAddToUserWordsMutation();

  if (isLoading) return <Spinner />;

  if (isSuccess) {
    return (
      <StyledMain>
        <ul>
          <CollectionPart data={data} type={CollectionType.DIFFICULT} />
          <CollectionPart data={data} type={CollectionType.SELECTED} />
          <CollectionPart data={data} type={CollectionType.LEARNED} />
        </ul>
        <button
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

              addToUserWords({ userId: user!.localId, data: updatedWords });
            }
          }}
        >
          Clear all
        </button>
      </StyledMain>
    );
  }
  return <>no Data</>;
}

export default Collection;
