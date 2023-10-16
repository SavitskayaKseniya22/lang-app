import { createContext } from 'react';
import { GameResultType } from '../../../interfaces';

const ResultContext =
  createContext<React.MutableRefObject<GameResultType> | null>(null);

export default ResultContext;
