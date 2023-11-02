import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { WordBaseValues, WordType } from '../../interfaces';
import { useGetAllWordsQuery } from '../../store/words/wordsApi';
import DragAndDrop from './components/DragAndDrop';
import { getRandom } from '../../utils';
import Suspended from '../../components/Suspended';

const StyledSentences = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;

  gap: 1rem;

  div {
    &.true {
      color: green;
    }
    &.false {
      color: red;
    }
  }
`;

function Puzzles() {
  const initData = useRef({
    page: getRandom(0, WordBaseValues.MAXPAGE),
    group: getRandom(0, WordBaseValues.MAXGROUP),
  });

  const { data: wordList } = useGetAllWordsQuery(initData.current);
  const [word, setWord] = useState<WordType | null>(null);

  const count = useRef(0);
  const dragResult = useRef<null | string>(null);

  const [middleResult, setMiddleResult] = useState<null | boolean>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (wordList) {
      setWord(wordList[count.current]);
    }
  }, [wordList]);

  return (
    <Suspended condition={!!wordList}>
      <StyledSentences>
        {word && wordList && (
          <>
            <h4>{word.word}</h4>
            <p>{word.textExampleTranslate}</p>

            <DragAndDrop
              source={word.textExample}
              returnResult={(value: string) => {
                dragResult.current = value;
              }}
              isItActive={middleResult === null}
            />
            {middleResult !== null && (
              <div
                className={
                  word.textExample === dragResult.current ? 'true' : 'false'
                }
              >
                {word.textExample}
              </div>
            )}

            {middleResult !== null ? (
              <button
                type="button"
                onClick={() => {
                  if (count.current < 3) {
                    count.current += 1;
                    setWord(wordList[count.current]);
                    setMiddleResult(null);
                  } else {
                    navigate('/result');
                  }
                }}
              >
                Next sentence
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMiddleResult(word.textExample === dragResult.current);
                }}
              >
                Check
              </button>
            )}
          </>
        )}
      </StyledSentences>
    </Suspended>
  );
}

export default Puzzles;
