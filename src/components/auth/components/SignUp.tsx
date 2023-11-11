/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  useSignInMutation,
  useSignUpMutation,
} from '../../../store/auth/authApi';

import { StyledAuthForm, passwordPattern } from './SignIn';
import ModalContext from '../../modal/ModalContext';
import { BasicUserCredentials } from '../../../interfaces';
import { useCreateUserDataMutation } from '../../../store/userData/UserDataApi';

function SignUp() {
  const { register, handleSubmit } = useForm<BasicUserCredentials>();
  const [signUp] = useSignUpMutation();
  const [signIn] = useSignInMutation();
  const { setContent } = useContext(ModalContext);
  const navigate = useNavigate();
  const [createUserData] = useCreateUserDataMutation();

  function onSubmit(data: BasicUserCredentials) {
    const { email, password } = data;
    signUp(data)
      .unwrap()
      .then((res) => {
        const { localId } = res;
        createUserData({ userId: localId });
      })
      .then(() => {
        signIn({ email, password });
      })
      .then(() => {
        setContent(null);
        navigate('/profile');
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
      <button type="submit">Sign up</button>
    </StyledAuthForm>
  );
}

export default SignUp;
