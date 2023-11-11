export interface BasicUserCredentials {
  email: string;
  password: string;
}

export type TextBookValuesTypes = { group: number; page: number };

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

export enum NumberDivisibility {
  ODD,
  EVEN,
}

export interface PointsType {
  step: number;
  total: number;
}

export type GameResultType = {
  answers: { correct: WordType[]; wrong: WordType[] };
  step: number;
  total: number;
  streak: number;
};

export interface ResultStatsType {
  correct: WordType[];
  wrong: WordType[];
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

export interface AuthErrorTypes {
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

export interface ActiveUserDataTypes {
  localId: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  providerUserInfo: [
    {
      providerId: string;
      displayName: string;
      photoUrl: string;
      federatedId: string;
      email: string;
      rawId: string;
      screenName: string;
    },
  ];
  photoUrl: string;
  passwordHash: string;
  passwordUpdatedAt: number;
  validSince: string;
  disabled: boolean;
  lastLoginAt: string;
  createdAt: string;
  customAuth: boolean;
  initialEmail: string;
}

export interface ActiveUserListDataTypes {
  kind: string;
  users: ActiveUserDataTypes[];
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

export interface CollectionLikeObjectType {
  difficult: { [id: string]: WordType };
  learned: { [id: string]: WordType };
  selected: { [id: string]: WordType };
}

export interface CollectionLikeArraysType {
  difficult: WordType[];
  learned: WordType[];
  selected: WordType[];
}

export interface UserWordsData {
  id: string;
  collections: CollectionLikeObjectType;
}

export interface Users {
  [id: string]: UserWordsData;
}

export enum CollectionType {
  DIFFICULT = 'difficult',
  LEARNED = 'learned',
  SELECTED = 'selected',
}

export type UserIdType = { userId: string };

export type WordIdType = { wordId: string };
