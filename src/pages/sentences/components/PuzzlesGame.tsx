import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { WordType } from '../../../interfaces';
import { StyledMain, StyledParagraph } from '../../../styled/SharedStyles';
import DragAndDrop from './DragAndDrop';
import StopWatch from '../../game/components/StopWatch';
import { DataQueue } from '../../../utils';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import Points from '../../game/components/Points';
import { updatePuzzlesTotalResult } from '../../../store/ResultSlice';

const StyledPuzzlesGame = styled(StyledMain)`
  justify-content: center;

  div {
    &.correct {
      color: green;
    }
    &.wrong {
      color: red;
    }
  }
`;

function PuzzlesGame({ data }: { data: DataQueue }) {
  const updater = useCallback(() => data.next(), [data]);

  const [word, setWord] = useState<WordType>(updater);

  const { puzzles } = useAppSelector((state) => state.resultsReducer);

  const [middleResult, setMiddleResult] = useState<null | boolean>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <StyledPuzzlesGame>
      <StopWatch doAfterTimer={() => {}} />
      <Points step={puzzles.step} total={puzzles.total} />
      <h4>
        {word.word} - {word.wordTranslate}
      </h4>
      <StyledParagraph>{word.textExampleTranslate}</StyledParagraph>
      <DragAndDrop word={word} isItActive={middleResult === null} />

      {middleResult !== null ? (
        <>
          <div className={middleResult ? 'correct' : 'wrong'}>
            {word.textExample}
          </div>
          <button
            type="button"
            onClick={() => {
              if (data.isEmpty) {
                navigate('/games/puzzles/result');
              } else {
                setWord(updater);
                setMiddleResult(null);
              }
            }}
          >
            Next sentence
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => {
            setMiddleResult(puzzles.middleResult);
            dispatch(updatePuzzlesTotalResult());
          }}
        >
          Check
        </button>
      )}
    </StyledPuzzlesGame>
  );
}

export default PuzzlesGame;
