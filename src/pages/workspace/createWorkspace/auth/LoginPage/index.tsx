import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useLoginService } from '../../../../../features/auth/authService';
import { setAuthData } from '../../../../../features/auth/authSlice';
import Form from '../../../../../components/Form';
import Wrapper from '..';
import Help from '../Help';
import { formikConfig } from '../../../../../components/Comments/components/componentType';
import { useAppDispatch } from '../../../../../app/hooks';
import GoogleLogin from '../../GoogleLogin';

function LoginPage() {
  const dispatch = useAppDispatch();

  const { mutate: onLogin, data } = useLoginService();

  useEffect(() => {
    if (data) {
      const { user } = data.data;
      const { name, default_workspace_id } = user;
      const userData = { name, default_workspace_id };
      const { accessToken, token } = data.data.token;
      const { user_id } = token;

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      localStorage.setItem('currentWorkspaceId', JSON.stringify(default_workspace_id));
      localStorage.setItem('currentUserId', JSON.stringify(user_id));
      dispatch(
        setAuthData({
          user,
          accessToken,
          currentWorkspaceId: default_workspace_id,
          currentUserId: user_id
        })
      );
    }
  }, [data]);

  const onSubmit = (values: { email: string; password: string }) => {
    onLogin({
      email: values.email,
      password: values.password
    });
  };

  const formikConfig: formikConfig = {
    initValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(8, 'Password must be 8 characters or longer!').required('Required')
    }),
    buttonTitle: 'Sign In'
  };

  return (
    <Wrapper>
      <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col px-4 py-8 bg-white shadow-lg sm:rounded-lg sm:px-10 gap-7">
          <h2 className="text-2xl font-bold text-center">Welcome back!</h2>
          <Form onSubmit={(values) => onSubmit(values)} formikConfig={formikConfig} />

          <GoogleLogin title="Or sign in with Google" />
        </div>
        <Help />
      </div>
    </Wrapper>
  );
}

export default LoginPage;
