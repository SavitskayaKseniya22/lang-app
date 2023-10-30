/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useSignInMutation } from '../../../store/auth/authApi';
import { BasicUserCredentials } from '../../../interfaces';
import ModalContext from '../../modal/ModalContext';

export const passwordPattern =
  /(?=.*[+-_@$!%*?&#.,;:[\]{}])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[0-9a-zA-Z+-_@$!%*?&#.,;:[\]{}]{8,}/g;

export const StyledAuthForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  input {
    min-width: 300px;
    padding: 0.5rem;
    border: none;
    background-color: rgb(244, 162, 97);
    text-align: center;
    font-size: 1.25rem;
  }
  button {
    font-size: 1.25rem;
  }
`;

function SignIn() {
  const { register, handleSubmit } = useForm<BasicUserCredentials>();
  const [signIn] = useSignInMutation();
  const { setContent } = useContext(ModalContext);

  function onSubmit(data: BasicUserCredentials) {
    signIn(data)
      .unwrap()
      .then(() => {
        setContent(null);
      })
      .catch((err) => {
        if ('data' in err) {
          toast.error(err.data);
        }
      });
  }

  return (
    <StyledAuthForm onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: true,
        })}
        type="email"
        placeholder="email"
      />
      <input
        {...register('password', {
          required: true,
          pattern: passwordPattern,
        })}
        type="password"
        placeholder="password"
      />
      <button type="submit">Sign in</button>
    </StyledAuthForm>
  );
}

export default SignIn;
