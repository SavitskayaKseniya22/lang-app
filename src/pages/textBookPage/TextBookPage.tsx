/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PageCounter from './components/PageCounter';
import {
  initialTextBookValues,
  TextBookPageContext,
  TextBookValuesTypes,
} from '../../contexts/TextBookPageContext';
import GroupPicker from './components/GroupPicker';

function TextBookPage() {
  const [textBookValues, setTextBookValues] = useState<TextBookValuesTypes>(
    initialTextBookValues
  );

  useEffect(() => {
    console.log(textBookValues);
    // getData
  }, [textBookValues]);

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

      <TextBookPageContext.Provider
        value={{ textBookValues, setTextBookValues }}
      >
        <PageCounter />
        <GroupPicker />
      </TextBookPageContext.Provider>
    </div>
  );
}

export default TextBookPage;
