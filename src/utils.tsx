import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import React from 'react';
import { FirebaseErrorTypes, WordBaseValues, WordType } from './interfaces';

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

export function checkIfAnswerCorrect(
  value: string,
  firstWord: WordType,
  secondWord: WordType
) {
  return (
    (value === 'true' && firstWord.id === secondWord.id) ||
    (value === 'false' && firstWord.id !== secondWord.id)
  );
}

export function shuffle<T>(array: Array<T>): Array<T> {
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

export function getRandomItemsFromArray<T>(
  array: Array<T>,
  value: number
): Array<T> {
  return shuffle(array).slice(0, value);
}

export function makeEmptyArrayWithIds(length: number) {
  return convertArray(new Array(length).fill(0));
}

export function transformAuthError(response: FetchBaseQueryError) {
  const { message } = (response.data as FirebaseErrorTypes).error;
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
  value,
  sentence,
}: {
  value: string;
  sentence: string;
}) {
  const length = sentence?.split(' ').length;

  const table = [4, 6, length];

  if ((+value === 0 && length < 4) || (+value === 1 && length < 6)) {
    return length;
  }

  return table[+value] || 6;
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

export function createSecondIndex(basicIndex: number, maxIndex: number) {
  return Math.random() <= 0.5
    ? basicIndex
    : getRandom(WordBaseValues.MINWORD, maxIndex);
}

export class DataQueue {
  elements: WordType[] = [];

  head: number = 0;

  tail: number;

  constructor(elements: WordType[]) {
    this.elements = elements;
    this.tail = elements.length;
  }

  next() {
    const item = this.elements[this.head];
    this.head += 1;
    return item;
  }

  nextWordLikeArray() {
    const item = this.elements[this.head];
    this.head += 1;
    return {
      ...item,
      letters: item.word.split('').map((letter, i) => ({ letter, key: i })),
    };
  }

  peek() {
    return this.elements[this.head];
  }

  nextPair() {
    const first = this.elements[this.head];
    const secondIndex = createSecondIndex(this.head, this.tail - 1);
    const second = this.elements[secondIndex];
    this.head += 1;
    return { first, second };
  }

  nextFour() {
    let elements = [...this.elements];

    const excludedElements = [this.elements[this.head]];

    while (excludedElements.length !== 5) {
      elements = elements.filter(
        (elem) => elem.id !== excludedElements[excludedElements.length - 1].id
      );

      const index = getRandom(WordBaseValues.MINWORD, elements.length - 1);
      excludedElements.push(elements[index]);
    }

    this.head += 1;
    return { ref: excludedElements[0], others: shuffle(excludedElements) };
  }

  get length() {
    return this.tail - this.head;
  }

  get isEmpty() {
    return this.length === 0;
  }
}

export function checkStepValue(dif: string) {
  return [5, 10, 15][+dif] || 5;
}
