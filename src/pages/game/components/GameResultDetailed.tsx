import React, { useEffect, useState } from 'react';
import {
  useAddToUserWordsMutation,
  useGetUserWordsQuery,
  useSetUserWordsMutation,
} from '../../../store/results/resultsApi';
import {
  useAddWordToCollectionMutation,
  useGetUserCollectionQuery,
} from '../../../store/userData/UserDataApi';
import {
  CollectionType,
  GameResultType,
  WordWithIdType,
} from '../../../interfaces';

function GameResultDetailed({
  userId,
  result,
}: {
  userId: string;
  result: GameResultType;
}) {
  const { correct, wrong } = result.answers;
  const [newWords, setNewWords] = useState<null | number>(null);
  const [newLearned, setNewLearned] = useState<WordWithIdType>({});

  const [setUserWords] = useSetUserWordsMutation();
  const [addToUserWords] = useAddToUserWordsMutation();
  const [addWordToCollection] = useAddWordToCollectionMutation();

  const { data: userWords, isSuccess: isGetUserWordsSuccess } =
    useGetUserWordsQuery({ userId });

  const { data: userCollection } = useGetUserCollectionQuery({
    userId,
  });

  useEffect(() => {
    if (isGetUserWordsSuccess) {
      if (!userWords) {
        const resultForSave: WordWithIdType = {};

        correct.forEach((word) => {
          resultForSave[word.id] = { ...word, guessed: 1 };
        });

        wrong.forEach((word) => {
          resultForSave[word.id] = { ...word, guessed: 0 };
        });

        setUserWords({ userId, data: resultForSave });
        setNewWords(correct.length + wrong.length);
      }

      if (userCollection && userWords) {
        const resultForSave: WordWithIdType = {};

        wrong.forEach((word) => {
          resultForSave[word.id] = { ...word, guessed: 0 };
        });

        correct.forEach((word) => {
          const max = Object.keys(
            userCollection[CollectionType.DIFFICULT] || []
          ).includes(word.id)
            ? 5
            : 3;

          const prevGuessed = userWords[word.id]?.guessed || 0;

          const guessed =
            prevGuessed + 1 <= max ? prevGuessed + 1 : prevGuessed;

          resultForSave[word.id] = {
            ...word,
            guessed,
          };

          const learned: WordWithIdType = {};

          if (max === prevGuessed + 1 && max !== prevGuessed) {
            learned[word.id] = {
              ...word,
              guessed,
            };
            if (Object.keys(learned).length) {
              addWordToCollection({
                userId,
                wordData: learned,
                collectionType: CollectionType.LEARNED,
              });
            }
          }

          setNewLearned(learned);
          // add to learned col
        });

        addToUserWords({ userId, data: resultForSave });

        setNewWords(
          [...correct, ...wrong].filter(
            (word) => !Object.keys(userWords).includes(word.id)
          ).length
        );
      }
    }
  }, [
    addToUserWords,
    addWordToCollection,
    correct,
    isGetUserWordsSuccess,
    setUserWords,
    userCollection,
    userId,
    userWords,
    wrong,
  ]);

  return (
    <div>
      {`${newWords} new words encountered`}
      {`${Object.keys(newLearned).length} new words learned`}
    </div>
  );
}

export default GameResultDetailed;

// если userWords нет

/// / просто пройти по словам и проставить guessed 0 и 1, записать userWords как есть

// если есть

// ошибочные просто записать в слова с guessed 0
// правильным добавить +1 к guessed. сравнить с необходимым кол-вом попыток исходя из сложности и перенести в изученые

// вывести сколько новых слов

/// вывести сколько слов стало изученными

// сделать изученным- добавить в коллекцию+добавить в юзервордс с максимальным знакомб
// удалить из учуенных - удалить из коллекции и обнулить слово
