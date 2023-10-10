import React from 'react';
import Wrapper from '..';
import Form from '../../../../../components/Form';
import * as Yup from 'yup';
import { formikConfig } from '../../../../../components/Comments/components/componentType';
import Help from '../Help';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { UseResetPassword } from '../../../../../features/auth/authService';

function ResetPassword() {
  const navigate = useNavigate();

  const { resetCode } = useParams();
  const formikConfig: formikConfig = {
    initValues: {
      password: '',
      'confirm password': ''
    },
    validationSchema: Yup.object({
      password: Yup.string().min(8, 'Password must be 8 characters or longer!').required('Required'),
      'confirm password': Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required')
    }),
    buttonTitle: 'Create Password'
  };

  const forgotPassword = useMutation(UseResetPassword, {
    onSuccess: () => {
      navigate('/auth/login');
    }
  });

  const onSubmit = async (values: { password?: string; 'confirm password'?: string }) => {
    if (resetCode) {
      try {
        if (resetCode) {
          await forgotPassword.mutateAsync({
            password: values.password,
            password_confirmation: values['confirm password'],
            code: resetCode
          });
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  return (
    <Wrapper>
      <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col px-4 py-8 bg-white shadow-lg sm:rounded-lg sm:px-10 gap-7">
          <h2 className="text-2xl font-bold text-center">Forgot your password?</h2>
          <Form onSubmit={(values) => onSubmit(values)} formikConfig={formikConfig} />
          <button className="text-primary-600" onClick={() => navigate('/auth/login')}>
            Or Sign in
          </button>
        </div>
        <Help />
      </div>
    </Wrapper>
  );
}

export default ResetPassword;
