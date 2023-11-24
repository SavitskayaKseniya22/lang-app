import React, { useEffect, useState } from 'react';
import { ComplicatedResultType, WordWithIdType } from '../../../interfaces';
import {
  useAddToUserWordsMutation,
  useGetUserWordsQuery,
} from '../../../store/userWordsApi';

function GameResultDetailed({
  userId,
  result,
}: {
  userId: string;
  result: ComplicatedResultType;
}) {
  const { correct, wrong } = result.answers;
  const [newWords, setNewWords] = useState(0);
  const [newLearned, setNewLearned] = useState(0);

  const { data: userWords, isSuccess } = useGetUserWordsQuery({ userId });

  const [addToUserWords] = useAddToUserWordsMutation();

  useEffect(() => {
    if (isSuccess) {
      if (!userWords) {
        const resultForSave: WordWithIdType = {};

        correct.forEach((word) => {
          resultForSave[word.id] = { ...word, guessed: 1 };
        });

        wrong.forEach((word) => {
          resultForSave[word.id] = { ...word, guessed: 0 };
        });

        addToUserWords({ userId, data: resultForSave });
        setNewWords(correct.length + wrong.length);
      } else {
        const resultForSave: WordWithIdType = {};

        wrong.forEach((word) => {
          const prevData = userWords[word.id] || word;
          resultForSave[word.id] = { ...prevData, guessed: 0 };
        });

        correct.forEach((word) => {
          const prevData = userWords[word.id] || word;

          const max = userWords[word.id]?.difficult ? 5 : 3;

          const prevGuessed = userWords[word.id]?.guessed || 0;

          const guessed =
            prevGuessed + 1 <= max ? prevGuessed + 1 : prevGuessed;

          const learned = max === prevGuessed + 1 && max !== prevGuessed;

          resultForSave[word.id] = {
            ...prevData,
            guessed,
            learned,
          };

          if (learned) {
            setNewLearned((a) => a + 1);
          }
        });

        addToUserWords({ userId, data: resultForSave });

        setNewWords(
          [...correct, ...wrong].filter(
            (word) => !Object.keys(userWords).includes(word.id)
          ).length
        );
      }
    }
  }, [addToUserWords, correct, isSuccess, userId, userWords, wrong]);

  return (
    <>
      <h3>{`${newWords} new words encountered`}</h3>
      <h3>{`${newLearned} new words learned`}</h3>
    </>
  );
}

export default GameResultDetailed;
