export interface BasicUserCredentials {
  email: string;
  password: string;
}

export interface ExtendedUserCredentials extends BasicUserCredentials {
  name: string;
}

export interface AuthData {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export type TextBookValuesTypes = { group: number; page: number };

export interface WordType {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  userWord?: UserWordInfo;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface UserWordInfo {
  id?: string;
  difficulty: string; // either learned or normal or difficult
  optional: {
    timesGuessed: number; // 3 times for a normal word to become learned, 5 times for a difficult one
    timesMax: number; // 3 for normal ones 5 for difficult ones
    dateEncountered: string;
    dateLearned: string | undefined;
  };
}

export enum GameType {
  SPRINT = 'Sprint',
  AUDIOCALL = 'Audiocall',
  PUZZLES = 'Puzzles',
}
export enum WordBaseValues {
  MINGROUP = 0,
  MAXGROUP = 5,
  MINPAGE = 0,
  MAXPAGE = 29,
  MAXWORD = 19,
  MINWORD = 0,
}

export enum DefaultTextBookValues {
  group = WordBaseValues.MINGROUP,
  page = WordBaseValues.MINPAGE,
}

export enum StreakValues {
  MIN = 0,
  MAX = 3,
}

export enum StepValues {
  MIN = 10,
}

export type GameProps = {
  type: GameType;
  page?: number;
  group?: number;
};

export enum NumberDivisibility {
  ODD,
  EVEN,
}

export interface PointsType {
  step: number;
  total: number;
}

export type GameResultType = {
  answers: AnswerType[];
  points: PointsType;
  streak: number;
};

export interface ResultStatsType {
  correct: AnswerType[];
  wrong: AnswerType[];
  percent: number;
  message: string;
}

export interface ActiveWordTypes {
  index: number;
  word: WordType;
}

export interface ActiveWordsTypes {
  first: ActiveWordTypes;
  second: ActiveWordTypes;
}

export interface AnswerType {
  word: WordType;
  answer: boolean;
}

export type ChildrenProps = string | JSX.Element | JSX.Element[];

export interface WordForDrop {
  key: string;
  word: string;
}

export interface DropData {
  source: WordForDrop[];
  result: WordForDrop[];
}

export interface AuthError {
  status: string;
  originalStatus: number;
  data: string;
  error: string;
}

export function isAuthError(x: unknown): x is AuthError {
  return Boolean(
    typeof x === 'object' &&
      x &&
      'data' in x &&
      typeof x.data === 'string' &&
      'originalStatus' in x &&
      typeof x.originalStatus === 'number'
  );
}

export enum ScreenSize {
  MOBILE = '(min-width: 320px)',
  TABLET = '(min-width: 768px)',
  LAPTOPS = '(min-width: 1024px)',
  LAPTOPL = '(min-width: 1920px)',
}
