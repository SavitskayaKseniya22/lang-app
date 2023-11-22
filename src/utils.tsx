import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import React from 'react';
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

export function createSecondIndex(basicIndex: number, maxIndex: number) {
  return Math.random() <= 0.5
    ? basicIndex
    : getRandom(WordBaseValues.MINWORD, maxIndex);
}

export function getActiveWordsArgs(
  data: WordType[],
  basicIndex: number,
  maxIndex: number
) {
  const secondIndex = createSecondIndex(basicIndex, maxIndex);

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

export function fetchAndCreateReactImage(partOfUrl: string) {
  return fetch(
    `https://raw.githubusercontent.com/irinainina/rslang/rslang-data/data/${partOfUrl}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.blob();
    })
    .then((response) =>
      React.createElement('img', {
        src: URL.createObjectURL(response),
      })
    );
}

export function checkPartition({
  val,
  sentence,
}: {
  val: string;
  sentence: string;
}) {
  const length = sentence?.split(' ').length;

  const table = [4, 6, length];

  if ((+val === 0 && length < 4) || (+val === 1 && length < 6)) {
    return length;
  }

  return table[+val] || 6;
}

export function divideSentence(sentence: string, value: number) {
  const arr = sentence.split(' ');
  const maxWordsInPart = Math.round(arr.length / value);
  let dividedSentence: string[] = [];
  while (arr.length >= maxWordsInPart) {
    const part = arr.splice(0, maxWordsInPart);
    dividedSentence = dividedSentence.concat(part.join(' '));
  }
  return dividedSentence.concat(arr);
}
