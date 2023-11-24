export interface BasicUserCredentials {
  email: string;
  password: string;
}

export interface FirebaseErrorTypes {
  error: {
    errors: [
      {
        domain: string;
        reason: string;
        message: string;
      },
    ];
    code: number;
    message: string;
  };
}

export interface ActiveUserTypes {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
  profilePicture: string;
}

export type TextBookValuesTypes = { group: number; page: number };

export enum GameType {
  SPRINT = 'Sprint',
  AUDIOCALL = 'Audiocall',
  PUZZLES = 'Puzzles',
}

export enum GameDifficultyType {
  SPRINT = 6,
  AUDIOCALL = 6,
  PUZZLES = 3,
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

export enum NumberDivisibility {
  ODD,
  EVEN,
}

export interface PointsType {
  step: number;
  total: number;
}

export type ComplicatedResultType = {
  answers: { correct: WordType[]; wrong: WordType[] };
  step: number;
  total: number;
  streak: number;
};

export interface WordType {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface ResultStatsType {
  correct: WordType[];
  wrong: WordType[];
  percent: number;
  message: string;
}

export interface ActiveWordsTypes {
  first: WordType;
  second: WordType;
}

export type ChildrenProps = string | JSX.Element | JSX.Element[];

export interface WordForDrop {
  key: string;
  element: string | number;
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

export enum ScreenSize {
  MOBILE = '(min-width: 320px)',
  TABLET = '(min-width: 768px)',
  LAPTOPS = '(min-width: 1024px)',
  LAPTOPL = '(min-width: 1920px)',
}

export type WordWithIdDataType = WordType & {
  guessed?: number;
  difficult?: boolean;
  learned?: boolean;
  selected?: boolean;
};

export interface WordWithIdType {
  [wordId: string]: WordWithIdDataType;
}

export enum CollectionType {
  DIFFICULT = 'difficult',
  LEARNED = 'learned',
  SELECTED = 'selected',
}

export interface CollectionLikeArraysType {
  [CollectionType.DIFFICULT]: WordWithIdDataType[];
  [CollectionType.LEARNED]: WordWithIdDataType[];
  [CollectionType.SELECTED]: WordWithIdDataType[];
  all: WordWithIdDataType[];
}

export interface UserWordsData {
  userId: string;
  words: WordWithIdType;
}

export interface Users {
  [userId: string]: UserWordsData;
}

export type UserIdType = { userId: string };

export type WordIdType = { wordId: string };
