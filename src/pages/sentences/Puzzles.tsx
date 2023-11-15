import React from 'react';
import { useLocation } from 'react-router-dom';

import PuzzlesGame from './components/PuzzlesGame';
import Spinner from '../../components/spinner/Spinner';
import { useGetRandomWordsQuery } from '../../store/wordsApi';
import { StyledMain } from '../../styled/SharedStyles';

function Puzzles() {
  const { state } = useLocation();

  const { data, isLoading, isSuccess } = useGetRandomWordsQuery(
    { group: state?.group || 0 },
    {
      skip: state && state.data,
    }
  );

  if (isLoading) return <Spinner />;

  if (isSuccess && data && data.length) {
    return <PuzzlesGame data={data} />;
  }
  if (state && state.data && state.data.length) {
    return <PuzzlesGame data={state.data} />;
  }

  return (
    <StyledMain>
      <h3>No data found. Please reload the page or return to the Main Page.</h3>
    </StyledMain>
  );
}

export default Puzzles;
