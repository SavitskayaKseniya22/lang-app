/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { ChildrenProps } from '../interfaces';
import Spinner from './spinner/Spinner';

function Suspended({
  condition,
  children,
}: {
  condition: boolean;
  children: ChildrenProps;
}) {
  return condition ? <>{children}</> : <Spinner />;
}

export default Suspended;
