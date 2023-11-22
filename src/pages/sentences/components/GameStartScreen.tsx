import React, { createContext, useContext, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GameDifficultyType, GameType, WordType } from '../../../interfaces';
import GroupPicker from '../../game/components/GroupPicker';
import { StyledMain } from '../../../styled/SharedStyles';
import GameTip from '../../game/components/GameTip';

interface InintialGameContextType {
  data: undefined | WordType[];
  group: string;
}

interface GameContextType {
  initial: InintialGameContextType;
  setInitial: React.Dispatch<React.SetStateAction<InintialGameContextType>>;
}

export const GameContext = createContext<GameContextType>({
  initial: { data: undefined, group: '1' },
  setInitial: () => {},
});

export function GameInitialData() {
  const location = useLocation();

  const [initial, setInitial] = useState<InintialGameContextType>({
    data: location?.state?.data,
    group: '1',
  });

  return (
    <GameContext.Provider
      value={useMemo(() => ({ initial, setInitial }), [initial, setInitial])}
    >
      <Outlet />
    </GameContext.Provider>
  );
}

const StyledGameLayout = styled(StyledMain)`
  justify-content: space-between;

  h2 {
    align-self: flex-start;
  }
`;

function GameStartScreen({
  value,
  type,
}: {
  value: GameDifficultyType;
  type: GameType;
}) {
  const { initial, setInitial } = useContext(GameContext);

  const navigate = useNavigate();

  return (
    <StyledGameLayout>
      <h2>{type}</h2>
      <GroupPicker
        value={value}
        onSubmit={(formData) => {
          setInitial({
            ...initial,
            group: formData.group,
          });

          navigate('game');
        }}
      />
      <GameTip type={type} />
    </StyledGameLayout>
  );
}

export default GameStartScreen;
