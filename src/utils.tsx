import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import {
  ActiveWordTypes,
  AuthErrorTypes,
  WordBaseValues,
  WordForDrop,
  WordType,
} from './interfaces';

export function checkColor($groupColor: number) {
  const colors = [
    'rgb(244, 162, 97)',
    'rgb(212, 75, 56)',
    'rgb(42, 157, 143)',
    'rgb(38, 70, 83)',
    'blueviolet',
    'black',
  ];
  return colors[$groupColor];
}

export function capitalize(string: string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function checkDisabled(number: number, ref: number) {
  return number === ref || false;
}

export function getRandom(min: number, max: number) {
  return Math.trunc(Math.random() * (max + 1 - min) + min);
}

export function getResultMessage(percent: number) {
  const messages = [
    'Next time will be better!',
    'You can do better!',
    'Nice! You start learning!',
    'Almost done!',
    'You are a native now. Congrats!',
  ];

  return messages[Math.round(percent / 25)];
}

export function getPercent(total: number, correct: number) {
  return Math.round((correct / total || 0) * 100);
}

export function createSecondIndex(firstIndex: number) {
  return Math.random() <= 0.6
    ? firstIndex
    : getRandom(WordBaseValues.MINWORD, WordBaseValues.MAXWORD);
}

export function getActiveWordsArgs(data: WordType[], basicIndex: number) {
  const secondIndex = createSecondIndex(basicIndex);

  return {
    first: { index: basicIndex, word: data[basicIndex] },
    second: { index: secondIndex, word: data[secondIndex] },
  };
}

export function checkIfAnswerCorrect(
  value: string,
  firstWord: ActiveWordTypes,
  secondWord: ActiveWordTypes
) {
  return (
    (value === 'true' && firstWord.word.id === secondWord.word.id) ||
    (value === 'false' && firstWord.word.id !== secondWord.word.id)
  );
}

export function shuffle(array: WordForDrop[]) {
  const arrayCopy = [...array];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }
  return arrayCopy;
}

export function convertArray(array: Array<string | number>) {
  return array.map((item, i) => ({
    element: item || i,
    key: Math.random().toString(),
  }));
}

export function makeStringArrayWithIds(string: string) {
  return convertArray(string.split(' '));
}

export function makeEmptyArrayWithIds(length: number) {
  return convertArray(new Array(length).fill(0));
}

export function transformAuthError(response: FetchBaseQueryError) {
  const { message } = (response.data as AuthErrorTypes).error;
  return {
    code: response.status,
    message: message.toLowerCase().replaceAll('_', ' '),
  };
}
