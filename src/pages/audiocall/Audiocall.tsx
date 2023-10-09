import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetAllWordsQuery } from '../../store/words/wordsApi';

function Audiocall() {
  const { state } = useLocation();

  const { data } = useGetAllWordsQuery(state, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div>2</div>;
}

export default Audiocall;
