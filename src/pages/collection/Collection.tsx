import React from 'react';
import { StyledMain } from '../../styled/SharedStyles';
import WordList from '../textBookPage/components/WordList';
import { useAppSelector } from '../../store/store';

function Collection() {
  const { collection } = useAppSelector((state) => state.persist.collection);
  return (
    <StyledMain>
      <WordList data={collection} />
    </StyledMain>
  );
}

export default Collection;
