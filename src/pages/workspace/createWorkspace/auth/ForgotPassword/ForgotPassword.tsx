import React from 'react';
import Wrapper from '..';
import Form from '../../../../../components/Form';
import * as Yup from 'yup';
import { formikConfig } from '../../../../../components/Comments/components/componentType';
import Help from '../Help';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { UseForgotPassword } from '../../../../../features/auth/authService';

function ForgotPassword() {
  const navigate = useNavigate();
  const formikConfig: formikConfig = {
    initValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required')
    }),
    buttonTitle: 'Send me the link'
  };

  const forgotPassword = useMutation(UseForgotPassword, {
    onSuccess: () => {
      navigate('/auth/recover');
    }
  });

  const onSubmit = (values: { email?: string }) => {
    forgotPassword.mutateAsync({
      email: values.email
    });
  };

  return (
    <Wrapper>
      <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col px-4 py-8 bg-white shadow-lg sm:rounded-lg sm:px-10 gap-7">
          <h2 className="text-2xl font-bold text-center">Create a new password!</h2>
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

export default ForgotPassword;
