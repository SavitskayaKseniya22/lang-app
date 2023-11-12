/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { BasicUserCredentials } from '../../../interfaces';

export const passwordPattern =
  /(?=.*[+-_@$!%*?&#.,;:[\]{}])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[0-9a-zA-Z+-_@$!%*?&#.,;:[\]{}]{8,}/g;

export const StyledAuthForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  flex-grow: 222;
`;

export const StyledInput = styled('input')`
  width: 100%;
  padding: 0.5rem;
  border: none;
  background-color: rgb(244, 162, 97);
  text-align: center;
  font-size: 1.25rem;
`;

function AuthForm({
  onSubmit,
}: {
  onSubmit: (data: BasicUserCredentials) => void;
}) {
  const { register, handleSubmit } = useForm<BasicUserCredentials>();

  return (
    <StyledAuthForm onSubmit={handleSubmit(onSubmit)}>
      <StyledInput
        {...register('email', {
          required: true,
        })}
        type="email"
        placeholder="email"
      />
      <StyledInput
        {...register('password', {
          required: true,
          pattern: passwordPattern,
        })}
        type="password"
        placeholder="password"
      />
      <button type="submit">Enter</button>
    </StyledAuthForm>
  );
}

export default AuthForm;
