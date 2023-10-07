/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import PageCounter from './components/PageCounter';

import GroupPicker from './components/GroupPicker';
import { useGetAllWordsQuery } from '../../store/words/wordsApi';

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
    <div className="textbook-container">
      <ul>
        <li>
          <NavLink to="/sprint">Sprint</NavLink>
        </li>
        <li>
          <NavLink to="/audio-challenge">Audio-challenge</NavLink>
        </li>
      </ul>

      {data && <div>data</div>}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})}>
          <PageCounter />
          <GroupPicker />
        </form>
      </FormProvider>
    </div>
  );
}

export default TextBookPage;
