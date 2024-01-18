/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnswersType, WordType, WordWithIdType } from '../../../interfaces';
import {
  useAddToUserWordsMutation,
  useGetUserWordsQuery,
} from '../../../store/userWordsApi';
import { useAppSelector } from '../../../store/store';
import WordList from '../../textBookPage/components/WordList';

export const StyledGameResultContent = styled('ul')`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: space-between;
`;

export const StyledGameResultContentItem = styled('li')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function GameResultDetailed({ result }: { result: AnswersType }) {
  const { correct, wrong } = result.answers;
  const [newWords, setNewWords] = useState<WordType[]>([]);
  const [newLearned, setNewLearned] = useState<WordType[]>([]);

  const { user } = useAppSelector((state) => state.persist.auth);

  const { data: userWords, isSuccess } = useGetUserWordsQuery(
    {
      userId: user?.localId || 'localId',
      tokenId: user?.idToken || 'idToken',
    },
    {
      skip: !user,
    }
  );

  const [addToUserWords] = useAddToUserWordsMutation();

  useEffect(() => {
    if (isSuccess && user) {
      if (!userWords) {
        const resultForSave: WordWithIdType = {};

        correct.forEach((word) => {
          resultForSave[word.id] = { ...word, guessed: 1 };
        });

        wrong.forEach((word) => {
          resultForSave[word.id] = { ...word, guessed: 0 };
        });

        addToUserWords({
          userId: user?.localId,
          data: resultForSave,
          tokenId: user!.idToken,
        });

        setNewWords([...correct, ...wrong]);
      } else {
        const resultForSave: WordWithIdType = {};

        wrong.forEach((word) => {
          const prevData = userWords[word.id] || word;
          resultForSave[word.id] = { ...prevData, guessed: 0 };
        });

        const tempNewLearned: WordType[] = [];

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
            tempNewLearned.push(word);
          }
        });

        setNewLearned(tempNewLearned);

        addToUserWords({
          userId: user?.localId,
          data: resultForSave,
          tokenId: user!.idToken,
        });

        setNewWords(
          [...correct, ...wrong].filter(
            (word) => !Object.keys(userWords).includes(word.id)
          )
        );
      }
    }
  }, [isSuccess]);

  return (
    <StyledGameResultContent>
      <StyledGameResultContentItem>
        <h4>{`Correct (${correct.length}):`}</h4>
        {!user || (!newWords.length && !newLearned.length) ? (
          <WordList data={correct} />
        ) : (
          <WordList
            data={correct}
            encountered={newWords}
            learned={newLearned}
          />
        )}
      </StyledGameResultContentItem>
      <StyledGameResultContentItem>
        <h4>{`Wrong (${wrong.length}):`}</h4>
        {!user || (!newWords.length && !newLearned.length) ? (
          <WordList data={wrong} />
        ) : (
          <WordList data={wrong} encountered={newWords} learned={newLearned} />
        )}
      </StyledGameResultContentItem>
    </StyledGameResultContent>
  );
}

export default GameResultDetailed;
