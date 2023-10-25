import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { GameType, WordType } from '../../interfaces';
import GameContainer from '../game/components/GameContainer';
import { useGetAllWordsQuery } from '../../store/words/wordsApi';
import DragAndDrop from './components/DragAndDrop';

const StyledSentences = styled('div')`
  display: flex;
  justify-content: center;

  flex-direction: column;
  padding: 2rem;
  position: relative;
  gap: 2rem;

  .dragPlace {
    background-color: gainsboro;
    display: flex;
    justify-content: center;

    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .list1,
  .list2 {
    padding: 1rem;
    background-color: #311d1d;
    display: flex;
    gap: 1rem;

    li {
      background-color: gray;
      padding: 0.5rem;
    }
  }
`;

function Puzzles({ page, group }: { page: number; group: number }) {
  const { data: wordList } = useGetAllWordsQuery({ page, group });

  const count = useRef(0);

  const dragResult = useRef<null | string>(null);

  const [word, setWord] = useState<WordType | null>(null);

  useEffect(() => {
    if (wordList) {
      setWord(wordList[count.current]);
    }
  }, [wordList]);

  return (
    <GameContainer type={GameType.PUZZLES} condition>
      <StyledSentences>
        {word && wordList && (
          <>
            <h3>{word.word}</h3>
            <p>{word.textExampleTranslate}</p>

            <DragAndDrop
              source={word.textExample}
              returnResult={(value: string) => {
                dragResult.current = value;
              }}
            />

            <button
              type="button"
              onClick={() => {
                // check if correct
                console.log(dragResult);
                // load next q
                count.current += 1;

                setWord(wordList[count.current]);
              }}
            >
              Check
            </button>
          </>
        )}
      </StyledSentences>
    </GameContainer>
  );
}

export default Puzzles;
