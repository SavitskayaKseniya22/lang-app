import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WordType } from '../../interfaces';
import PuzzlesGame from './components/PuzzlesGame';
import Spinner from '../../components/spinner/Spinner';
import { useGetRandomWordsQuery } from '../../store/words/wordsApi';

function Puzzles() {
  const { group, data } = useLocation().state;

  const [initData, setInitData] = useState<WordType[]>(data);

  const { data: wordList, isLoading } = useGetRandomWordsQuery(
    { group },
    {
      skip: !!data,
    }
  );

  useEffect(() => {
    if (wordList) {
      setInitData(wordList);
    }
  }, [wordList]);

  if (isLoading) return <Spinner />;

  if (initData && initData.length) {
    return <PuzzlesGame data={initData} />;
  }

  return <div>No data found</div>;
}

export default Puzzles;
