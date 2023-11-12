import React from 'react';
import styled from 'styled-components';
import { CollectionType, WordType } from '../../../interfaces';
import { useAppSelector } from '../../../store/store';
import { useGetUserCollectionQuery } from '../../../store/userData/UserDataApi';
import CollectionControl from './CollectionControl';

const StyledCollectionControlPanel = styled('form')`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

function CollectionControlPanel({ wordData }: { wordData: WordType }) {
  const { user } = useAppSelector((state) => state.persist.auth);

  const { data, isSuccess } = useGetUserCollectionQuery(
    {
      userId: user?.localId || 'no-user',
    },
    {
      skip: !user,
    }
  );

  if (isSuccess) {
    return (
      <StyledCollectionControlPanel>
        <CollectionControl
          wordData={wordData}
          type={CollectionType.SELECTED}
          collection={data?.selected}
        />

        <CollectionControl
          wordData={wordData}
          type={CollectionType.LEARNED}
          collection={data?.learned}
        />

        <CollectionControl
          wordData={wordData}
          type={CollectionType.DIFFICULT}
          collection={data?.difficult}
        />
      </StyledCollectionControlPanel>
    );
  }

  return null;
}

export default CollectionControlPanel;
