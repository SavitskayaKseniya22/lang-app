/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import PagePicker from './components/PagePicker';
import GroupSelect from './components/GroupSelect';
import { useGetAllWordsQuery } from '../../store/words/wordsApi';
import WordList from './components/WordList';
import { DefaultTextBookValues, ScreenSize } from '../../interfaces';
import ModalContext from '../../components/modal/ModalContext';
import GamesPanel from './components/GamesPanel';

const StyledTextBook = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;

  @media ${ScreenSize.LAPTOPL} {
    padding: 10rem;
  }
`;

const StyledTextBookSettings = styled('div')`
  display: flex;
  gap: 1rem;
  align-items: center;
  position: sticky;
  bottom: 0;
  left: 0;
  background-color: white;
  padding: 1rem;
  width: 100%;
  flex-direction: column;

  @media ${ScreenSize.LAPTOPS} {
    justify-content: flex-end;
    flex-direction: row;
  }
`;

const StyledTextBookForm = styled('form')`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem;

  @media ${ScreenSize.LAPTOPS} {
    justify-content: flex-end;
    flex-direction: row;
  }
`;

function TextBookPage() {
  const methods = useForm({
    defaultValues: DefaultTextBookValues,
  });

  const { data } = useGetAllWordsQuery(methods.getValues(), {
    refetchOnMountOrArgChange: true,
  });

  const { setContent } = useContext(ModalContext);

  return (
    <StyledTextBook>
      <WordList data={data} />
      <StyledTextBookSettings>
        <FormProvider {...methods}>
          <StyledTextBookForm onSubmit={methods.handleSubmit(() => {})}>
            <PagePicker />
            <GroupSelect />
          </StyledTextBookForm>
        </FormProvider>
        <button
          type="button"
          onClick={() => {
            setContent(
              <GamesPanel
                group={methods.getValues().group}
                page={methods.getValues().page}
              />
            );
          }}
        >
          Practice this set of words
        </button>
      </StyledTextBookSettings>
    </StyledTextBook>
  );
}

export default TextBookPage;
