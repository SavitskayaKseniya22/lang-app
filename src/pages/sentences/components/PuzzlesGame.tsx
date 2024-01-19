import React, { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StyledGameContainer, StyledMain } from '../../../styled/SharedStyles';
import DragAndDrop from './DragAndDrop';
import StopWatch from '../../game/components/StopWatch';
import { DataQueue } from '../../../utils';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import Points from '../../game/components/Points';
import { updatePuzzlesTotalResult } from '../../../store/ResultSlice';
import ProgressTracking from '../../game/components/ProgressTracking';
import GameInfo from '../../game/components/GameInfo';
import { GameContext } from '../../game/components/GameStartScreen';

export const StyledPuzzlesGameAnswer = styled('h4')<{
  $type: 'correct' | 'wrong';
}>`
  color: ${(props) => (props.$type === 'correct' ? 'green' : 'red')};
  text-align: center;
`;

function PuzzlesGame({ data }: { data: DataQueue }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { puzzles } = useAppSelector((state) => state.resultsReducer);

  const { initial } = useContext(GameContext);

  const updater = useCallback(
    () => data.nextPuzzle(initial.group),
    [data, initial.group]
  );

  const [word, setWord] = useState(updater);
  const [middleResult, setMiddleResult] = useState<null | boolean>(null);

  return (
    <StyledMain>
      <GameInfo>
        <ProgressTracking streak={data.head} total={data.startLength} />
        <Points
          step={puzzles.step}
          total={puzzles.total}
          subtrahend={puzzles.subtrahend}
        />
      </GameInfo>

      <StopWatch doAfterTimer={() => {}} />

      <StyledGameContainer>
        <h4>
          {word.word} - {word.wordTranslate}
        </h4>
        <p>{word.textExampleTranslate}</p>
        <DragAndDrop word={word} isItActive={middleResult === null} />
        {middleResult !== null ? (
          <>
            {middleResult ? (
              <h3>{`+${puzzles.step}`}</h3>
            ) : (
              <h3>{`-${puzzles.subtrahend}`}</h3>
            )}
            <StyledPuzzlesGameAnswer $type={middleResult ? 'correct' : 'wrong'}>
              {word.textExample}
            </StyledPuzzlesGameAnswer>
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
      </StyledGameContainer>
    </StyledMain>
  );
}

export default PuzzlesGame;
