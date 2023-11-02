import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ModalContext from '../../../components/modal/ModalContext';
import { GameDuration } from '../../../interfaces';

const StyledGamesPanel = styled('ul')`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  flex-grow: 2;
`;

function GamesPanel({ page, group }: { page: number; group: number }) {
  const { setContent } = useContext(ModalContext);

  return (
    <StyledGamesPanel>
      <li>
        <Link
          to={`/sprint/${group}`}
          state={{ page, group, duration: GameDuration.SHORT }}
          onClick={() => {
            setContent(null);
          }}
        >
          Sprint
        </Link>
      </li>
      <li>
        <Link
          to={`/audiocall/${group}`}
          state={{ page, group, duration: GameDuration.SHORT }}
          onClick={() => {
            setContent(null);
          }}
        >
          Audiocall
        </Link>
      </li>
      <li>
        <Link
          to="/puzzles"
          state={{ page, group }}
          onClick={() => {
            setContent(null);
          }}
        >
          Puzzles
        </Link>
      </li>
    </StyledGamesPanel>
  );
}

export default GamesPanel;