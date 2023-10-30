/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import {
  useSignInMutation,
  useSignUpMutation,
} from '../../../store/auth/authApi';
import { ExtendedUserCredentials } from '../../../interfaces';
import { StyledAuthForm, passwordPattern } from './SignIn';
import ModalContext from '../../modal/ModalContext';

function SignUp() {
  const { register, handleSubmit } = useForm<ExtendedUserCredentials>();
  const [signUp] = useSignUpMutation();
  const [signIn] = useSignInMutation();
  const { setContent } = useContext(ModalContext);

  function onSubmit(data: ExtendedUserCredentials) {
    signUp(data)
      .unwrap()
      .then(() => {
        signIn({ email: data.email, password: data.password });
      })

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
        {...register('name', {
          required: true,
        })}
        type="name"
        placeholder="name"
      />
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
      <button type="submit">Sign up</button>
    </StyledAuthForm>
  );
}

export default SignUp;
