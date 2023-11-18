import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { WordType, WordBaseValues } from '../../../interfaces';
import { StyledMain, StyledParagraph } from '../../../styled/SharedStyles';
import Streak from '../../sprint/components/Streak';
import DragAndDrop from './DragAndDrop';
import { checkPartition, divideSentence } from '../../../utils';

const StyledPuzzlesGame = styled(StyledMain)`
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

function PuzzlesGame({
  data,
  difficulty,
}: {
  data: WordType[];
  difficulty: 0 | 1 | 2;
}) {
  const count = useRef(WordBaseValues.MINPAGE);

  const [word, setWord] = useState<WordType>(data[count.current]);
  const [sentence, setSentence] = useState<string>(
    data[count.current].textExample
  );

  const dragResult = useRef<null | string>(null);

  const [middleResult, setMiddleResult] = useState<null | boolean>(null);

  const navigate = useNavigate();

  return (
    <StyledPuzzlesGame>
      {word && data.length && (
        <>
          <Streak streak={6} total={10} />
          <h4>{word.word}</h4>
          <StyledParagraph>{word.textExampleTranslate}</StyledParagraph>

          <DragAndDrop
            source={divideSentence(
              sentence,
              checkPartition(difficulty, sentence)
            )}
            returnResult={(value: string) => {
              dragResult.current = value;
            }}
            isItActive={middleResult === null}
          />

          {middleResult !== null && (
            <div className={sentence === dragResult.current ? 'true' : 'false'}>
              {sentence}
            </div>
          )}

          {middleResult !== null ? (
            <button
              type="button"
              onClick={() => {
                if (count.current < WordBaseValues.MAXWORD) {
                  count.current += 1;
                  setWord(data[count.current]);
                  setSentence(data[count.current].textExample);
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
                setMiddleResult(sentence === dragResult.current);
              }}
            >
              Check
            </button>
          )}
        </>
      )}
    </StyledPuzzlesGame>
  );
}

export default PuzzlesGame;
