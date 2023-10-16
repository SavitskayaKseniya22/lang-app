import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  return <div>{timer}</div>;
}

export default Timer;
