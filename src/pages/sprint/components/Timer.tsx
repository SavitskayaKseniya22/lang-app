import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledTimer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 50%;
  border: 5px solid black;
  width: 5rem;
  height: 5rem;
  font-size: 1.5rem;
`;

function Timer({
  duration,
  doAfterTimer,
}: {
  duration: number;
  doAfterTimer: () => void;
}) {
  const [timer, setTimer] = useState(duration);
  const navigate = useNavigate();

  useEffect(() => {
    if (!timer) {
      doAfterTimer();
    }

    const interval = setTimeout(() => {
      setTimer((seconds) => seconds - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [doAfterTimer, navigate, timer]);

  return <StyledTimer>{timer}</StyledTimer>;
}

export default Timer;
