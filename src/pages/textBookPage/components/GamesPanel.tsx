import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ModalContext from '../../../components/modal/ModalContext';
import { WordType } from '../../../interfaces';
import { StyledGameItem, StyledGameList } from '../../Games/Games';

const StyledGamePanel = styled(StyledGameList)`
  background-color: white;
  margin: 1rem;
`;

function GamesPanel({ data }: { data: WordType[] }) {
  const { setContent } = useContext(ModalContext);

  return (
    <StyledGamePanel>
      <StyledGameItem>
        <Link
          to="/games/sprint/game"
          state={{ data }}
          onClick={() => {
            setContent(null);
          }}
        >
          <h4>Sprint</h4>
        </Link>
      </StyledGameItem>
      <StyledGameItem>
        <Link
          to="/games/audiocall/game"
          state={{ data }}
          onClick={() => {
            setContent(null);
          }}
        >
          <h4>Audiocall</h4>
        </Link>
      </StyledGameItem>
      <StyledGameItem>
        <Link
          to="/games/puzzles/game"
          state={{ data }}
          onClick={() => {
            setContent(null);
          }}
        >
          <h4>Puzzles</h4>
        </Link>
      </StyledGameItem>
    </StyledGamePanel>
  );
}

export default GamesPanel;
