import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useGetAllWordsQuery } from '../../store/words/wordsApi';
import Timer from '../game/components/Timer';

const StyledAudiocall = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
`;

function Audiocall() {
  const { state } = useLocation();

  const { data } = useGetAllWordsQuery(state, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <StyledAudiocall>
      <Timer duration={60} doAfterTimer={() => {}} />
    </StyledAudiocall>
  );
}

export default Audiocall;
