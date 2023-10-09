import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetAllWordsQuery } from '../../store/words/wordsApi';

function Sprint() {
  const { state } = useLocation();

  const { data } = useGetAllWordsQuery(state, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div>1</div>;
}

export default Sprint;
