import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ModalContext from '../../../components/modal/ModalContext';
import { WordType } from '../../../interfaces';

const StyledGamesPanel = styled('ul')`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  flex-grow: 2;
`;

function GamesPanel({ data }: { data: WordType[] }) {
  const { setContent } = useContext(ModalContext);

  return (
    <StyledGamesPanel>
      <li>
        <Link
          to="/games/sprint/game"
          state={{ data }}
          onClick={() => {
            setContent(null);
          }}
        >
          Sprint
        </Link>
      </li>
      <li>
        <Link
          to="/games/audiocall/game"
          state={{ data }}
          onClick={() => {
            setContent(null);
          }}
        >
          Audiocall
        </Link>
      </li>
      <li>
        <Link
          to="/games/puzzles/game"
          state={{ data }}
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
