/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import PagePicker from './components/PagePicker';
import GroupSelect from './components/GroupSelect';
import { useGetAllWordsQuery } from '../../store/wordsApi';
import WordList from './components/WordList';
import { DefaultTextBookValues, WordType } from '../../interfaces';
import ModalContext from '../../components/modal/ModalContext';
import GamesPanel from './components/GamesPanel';
import { StyledMain } from '../../styled/SharedStyles';
import Spinner from '../../components/spinner/Spinner';

const StyledTextBookSettings = styled('div')`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  flex-direction: column;
  position: sticky;
  bottom: 0;
  left: 0;
  background-color: white;
  width: 100%;
`;

const StyledTextBookForm = styled('form')`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem;
`;

function TextBookPage() {
  const methods = useForm({
    defaultValues: DefaultTextBookValues,
  });

  const { data, isLoading } = useGetAllWordsQuery(methods.getValues(), {
    refetchOnMountOrArgChange: true,
  });

  const { setContent } = useContext(ModalContext);

  if (isLoading) return <Spinner />;

  if (data) {
    return (
      <StyledMain>
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
              setContent(<GamesPanel data={data as WordType[]} />);
            }}
          >
            Practice this set of words
          </button>
        </StyledTextBookSettings>
      </StyledMain>
    );
  }

  return <div>No data found</div>;
}

export default TextBookPage;
