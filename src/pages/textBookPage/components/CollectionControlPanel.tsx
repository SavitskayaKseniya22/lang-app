import React from 'react';
import styled from 'styled-components';
import { CollectionType, WordType } from '../../../interfaces';
import { useGetUserCollectionQuery } from '../../../store/userData/UserDataApi';
import CollectionControl from './CollectionControl';

const StyledCollectionControlPanel = styled('form')`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

function CollectionControlPanel({
  wordData,
  userId,
}: {
  wordData: WordType;
  userId: string;
}) {
  const { data, isSuccess } = useGetUserCollectionQuery({
    userId,
  });

  if (isSuccess) {
    return (
      <StyledCollectionControlPanel>
        <CollectionControl
          wordData={wordData}
          collectionType={CollectionType.SELECTED}
          collection={data}
          userId={userId}
        />

        <CollectionControl
          wordData={wordData}
          collectionType={CollectionType.LEARNED}
          collection={data}
          userId={userId}
        />

        <CollectionControl
          wordData={wordData}
          collectionType={CollectionType.DIFFICULT}
          collection={data}
          userId={userId}
        />
      </StyledCollectionControlPanel>
    );
  }

  return null;
}

export default CollectionControlPanel;
