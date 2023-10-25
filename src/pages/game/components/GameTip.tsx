import React from 'react';
import styled from 'styled-components';
import { GameTipView, GameType } from '../../../interfaces';

const StyledGameTip = styled('ul')<{ $view: GameTipView }>`
  background-color: gainsboro;
  padding: 1rem;
  font-size: ${(props) =>
    props.$view === GameTipView.BIG ? '1.5rem' : '1rem'};
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$view === GameTipView.BIG ? '1.5rem' : '1rem')};
`;

function GameTip({ type, $view }: { type: GameType; $view: GameTipView }) {
  const tips = {
    sprint: [
      'Read or listen the word. Answer if the game suggested the correct translation.',
      'Control the game using the arrows keys on your keyboard.',
      'Press the Space key to pause.',
    ],
    audiocall: [
      'Listen to the word. Choose the right translation.',
      'Use keys 1 to 5 to control game from the keyboard.',
      'Press the Space key to pause.',
    ],
    puzzles: [
      'Make sentences from a set of words.',
      ' The number of points awarded depends on the length of the word.',
      'Use the hint if you need help. This will subtract one point from the final result.',
    ],
  };
  return (
    <StyledGameTip className="game-tip" $view={$view}>
      {tips[type].map((tip) => (
        <li key={tip}>{tip}</li>
      ))}
    </StyledGameTip>
  );
}

export default GameTip;
