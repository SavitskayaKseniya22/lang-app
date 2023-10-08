/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import PageCounter from './components/PageCounter';
import GroupPicker from './components/GroupPicker';
import { useGetAllWordsQuery } from '../../store/words/wordsApi';
import WordList from './components/WordList';

const StyledTextBook = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  gap: 1.5rem;

  form {
    display: flex;
    width: 100%;
    gap: 3rem;
    align-items: center;
    justify-content: flex-end;
  }
`;

function TextBookPage() {
  const methods = useForm({
    defaultValues: {
      group: 0,
      page: 0,
    },
  });

  const { data } = useGetAllWordsQuery(methods.getValues(), {
    refetchOnMountOrArgChange: true,
  });

  return (
    <StyledTextBook>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})}>
          <PageCounter />
          <GroupPicker />
        </form>
      </FormProvider>
      {data && <WordList data={data} />}
    </StyledTextBook>
  );
}

export default TextBookPage;
