import { ActiveWordTypes, WordType } from './interfaces';

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
  return number === ref || undefined;
}

export function getRandom(min: number, max: number) {
  return Math.trunc(Math.random() * (max - min) + min);
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
  return Math.random() <= 0.6 ? firstIndex : getRandom(0, 20);
}

export function getActiveWordsArgs(data: WordType[], basicIndex: number) {
  const secondIndex = createSecondIndex(basicIndex);

  return {
    first: { index: basicIndex, word: data[basicIndex] },
    second: { index: secondIndex, word: data[secondIndex] },
  };
}

export function isAnswerCorrect(
  value: string,
  firstWord: ActiveWordTypes,
  secondWord: ActiveWordTypes
) {
  return (
    (value === 'true' && firstWord.word.id === secondWord.word.id) ||
    (value === 'false' && firstWord.word.id !== secondWord.word.id)
  );
}
