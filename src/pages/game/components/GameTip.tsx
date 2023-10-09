import React from 'react';
import styled from 'styled-components';

const StyledGameTip = styled('ul')`
  background-color: gainsboro;
  padding: 1rem;
  font-size: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

function GameTip({ type }: { type: 'sprint' | 'audiocall' }) {
  const tips = {
    sprint: [
      'Read the word. Answer if the game suggested the correct translation.',
      'Control the game using the arrows keys on your keyboard.',
      'Press the Space key to pause.',
    ],
    audiocall: [
      'Listen to the word. Choose the right translation.',
      'Use keys 1 to 5 to control game from the keyboard.',
      'Press the Space key to pause.',
    ],
  };
  return (
    <StyledGameTip>
      {tips[type].map((tip) => (
        <li key={tip}>{tip}</li>
      ))}
    </StyledGameTip>
  );
}

export default GameTip;
