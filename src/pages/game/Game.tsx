/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { SprintProps } from '../../interfaces';
import GameTip from './components/GameTip';
import GroupPicker from './components/GroupPicker';

const StyledGame = styled('div')`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h2 {
    font-size: 4rem;
    margin: 2rem;
    text-align: center;
    font-family: 'Shizuru', cursive;
  }
`;

function Game({ type, page, group }: SprintProps) {
  const methods = useForm();

  const watchGroup = methods.watch('group-choice');

  const [initValues, setInitValues] = useState({
    page,
    group,
  });

  useEffect(() => {
    if (watchGroup) {
      setInitValues({ page: 0, group: watchGroup });
    }
  }, [watchGroup]);

  return initValues.group === undefined ? (
    <FormProvider {...methods}>
      <StyledGame>
        <h2>{type}</h2>
        <GameTip type={type} />
        <GroupPicker />
      </StyledGame>
    </FormProvider>
  ) : (
    <Navigate to={`${initValues.group}`} state={initValues} />
  );
}

export default Game;
