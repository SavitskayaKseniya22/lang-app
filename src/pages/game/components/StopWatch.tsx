import React, { useEffect, useRef, useState } from 'react';
import { StyledTimer } from './Timer';
import { getParcedTime, makeLineFromParcedTime } from '../../../utils';

function StopWatch({
  doAfterTimer,
}: {
  doAfterTimer: (value: number) => void;
}) {
  const [time, setTime] = useState(0);

  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((seconds) => seconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      doAfterTimer(time);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledTimer>
      <b>{makeLineFromParcedTime(getParcedTime({ time }))}</b>
    </StyledTimer>
  );
}

export default StopWatch;
