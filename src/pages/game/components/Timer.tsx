import React, { useEffect, useRef, useState } from 'react';
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
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0.5;
`;

function Timer({
  duration,
  doAfterTimer,
}: {
  duration: number;
  doAfterTimer: () => void;
}) {
  const [timer, setTimer] = useState(duration);

  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (timer === 0) {
      clearInterval(intervalRef.current);
      doAfterTimer();
    }
  }, [doAfterTimer, timer]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((seconds) => seconds - 1);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return <StyledTimer>{timer}</StyledTimer>;
}

export default Timer;
