import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultContext from './Context';

function Timer({ duration }: { duration: number }) {
  const [timer, setTimer] = useState(duration);
  const navigate = useNavigate();
  const context = useContext(ResultContext);

  useEffect(() => {
    if (!timer && context) {
      navigate('result', { state: context.current });
    }

    const interval = setTimeout(() => {
      setTimer((seconds) => seconds - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, timer]);

  return <div>{timer}</div>;
}

export default Timer;
