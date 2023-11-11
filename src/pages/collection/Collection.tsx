import React, { useEffect, useState } from 'react';
import { StyledMain } from '../../styled/SharedStyles';
import { useAppSelector } from '../../store/store';
import {
  useClearUserCollectionMutation,
  useGetUserCollectionQuery,
} from '../../store/userData/UserDataApi';
import { CollectionLikeArraysType, CollectionType } from '../../interfaces';
import Spinner from '../../components/spinner/Spinner';
import CollectionPart from './components/CollectionPart';

export const CollectionLikeArraysInitValues = {
  [CollectionType.DIFFICULT]: [],
  [CollectionType.LEARNED]: [],
  [CollectionType.SELECTED]: [],
};

function Collection() {
  const { user } = useAppSelector((state) => state.persist.auth);

  const { data, isSuccess, isLoading } = useGetUserCollectionQuery({
    userId: user!.localId,
  });

  const [words, setWords] = useState<CollectionLikeArraysType>(
    CollectionLikeArraysInitValues
  );

  const [clearUserCollection] = useClearUserCollectionMutation();

  useEffect(() => {
    if (isSuccess) {
      if (!data) {
        setWords(CollectionLikeArraysInitValues);
      } else {
        const selected = data.selected
          ? Object.keys(data.selected).map((item) => data.selected[item])
          : [];

        const difficult = data.difficult
          ? Object.keys(data.difficult).map((item) => data.difficult[item])
          : [];

        const learned = data.learned
          ? Object.keys(data.learned).map((item) => data.learned[item])
          : [];

        setWords({ selected, difficult, learned });
      }
    }
  }, [data, isSuccess]);

  if (isLoading) return <Spinner />;

  if (isSuccess && !data && !words) return <div>No data found</div>;

  return (
    <StyledMain>
      <ul>
        <CollectionPart
          data={words.difficult}
          type={CollectionType.DIFFICULT}
        />
        <CollectionPart data={words.selected} type={CollectionType.SELECTED} />
        <CollectionPart data={words.learned} type={CollectionType.LEARNED} />
      </ul>
      <button
        type="button"
        onClick={() => {
          clearUserCollection({ userId: user!.localId });
        }}
      >
        Clear all
      </button>
    </StyledMain>
  );
}

export default Collection;
