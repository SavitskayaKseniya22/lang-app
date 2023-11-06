import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { WordType, WordBaseValues } from '../../../interfaces';
import { StyledMain, StyledParagraph } from '../../../styled/SharedStyles';
import Streak from '../../sprint/components/Streak';
import DragAndDrop from './DragAndDrop';

const StyledSentences = styled(StyledMain)`
  justify-content: center;

  div {
    &.true {
      color: green;
    }
    &.false {
      color: red;
    }
  }
`;

function PuzzlesGame({ data }: { data: WordType[] }) {
  const count = useRef(WordBaseValues.MINPAGE);

  const [word, setWord] = useState<WordType>(data[count.current]);

  const dragResult = useRef<null | string>(null);

  const [middleResult, setMiddleResult] = useState<null | boolean>(null);

  const navigate = useNavigate();

  return (
    <StyledSentences>
      {word && data.length && (
        <>
          <Streak streak={6} total={10} />
          <h4>{word.word}</h4>
          <StyledParagraph>{word.textExampleTranslate}</StyledParagraph>

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
                if (count.current < WordBaseValues.MAXWORD) {
                  count.current += 1;
                  setWord(data[count.current]);
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
  );
}

export default PuzzlesGame;
