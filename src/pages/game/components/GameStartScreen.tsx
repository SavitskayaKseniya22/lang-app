import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GameProps, GameTipView } from '../../../interfaces';
import GameTip from './GameTip';

const StyledGameStartScreen = styled('div')``;

function GameStartScreen({ type, page, group }: GameProps) {
  const navigate = useNavigate();

  if (page !== undefined && group !== undefined) {
    navigate(group.toString(), { state: { page, group } });
  }

  return (
    <StyledGameStartScreen>
      <h2>{type}</h2>
      <GameTip type={type} $view={GameTipView.BIG} />
    </StyledGameStartScreen>
  );
}

export default GameStartScreen;
