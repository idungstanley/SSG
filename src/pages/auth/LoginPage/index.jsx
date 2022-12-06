/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import {
  loginService,
  loginGoogleService,
} from '../../../features/auth/authService';
import { setAuthData } from '../../../features/auth/authSlice';
import Form from '../../../components/Form';
import Wrapper from '..';
import Help from '../Help';

function LoginPage() {
  const dispatch = useDispatch();

  const loginMutation = useMutation(loginService, {
    onSuccess: (successData) => {
      localStorage.setItem('user', JSON.stringify(successData.data.user));
      localStorage.setItem(
        'accessToken',
        JSON.stringify(successData.data.token.accessToken),
      );
      localStorage.setItem(
        'currentWorkspaceId',
        JSON.stringify(successData.data.user.default_workspace_id),
      );
      localStorage.setItem(
        'currentUserId',
        JSON.stringify(successData.data.token.token.user_id),
      );

      dispatch(
        setAuthData({
          user: successData.data.user,
          accessToken: successData.data.token.accessToken,
          currentWorkspaceId: successData.data.user.default_workspace_id,
          currentUserId: successData.data.token.token.user_id,
        }),
      );
    },
  });

  const loginGoogleMutation = useMutation(loginGoogleService, {
    onSuccess: (successData) => {
      localStorage.setItem('user', JSON.stringify(successData.data.user));
      localStorage.setItem(
        'accessToken',
        JSON.stringify(successData.data.token.accessToken),
      );
      localStorage.setItem(
        'currentWorkspaceId',
        JSON.stringify(successData.data.user.default_workspace_id),
      );

      dispatch(
        setAuthData({
          user: successData.data.user,
          accessToken: successData.data.token.accessToken,
          currentWorkspaceId: successData.data.user.default_workspace_id,
        }),
      );
    },
  });

  const onSubmit = (values) => {
    loginMutation.mutate({
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const handleGoogleLogin = (response) => {
    if (response.code) {
      loginGoogleMutation.mutate({
        code: response.code,
      });
    } else {
      // error handler
    }
  };
  const handleGoogleFailure = (response) => {
    // fail handler: todo delete console log
    // eslint-disable-next-line no-console
    console.log(response);
  };

  const formikConfig = {
    initValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'Password must be 8 characters or longer!')
        .required('Required'),
    }),
    buttonTitle: 'Sign In',
  };

  return (
    <Wrapper>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 flex flex-col gap-7">
          <h2 className="text-center text-2xl font-bold">Welcome back!</h2>
          <Form
            onSubmit={(values) => onSubmit(values)}
            formikConfig={formikConfig}
          />

          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleFailure}
            cookiePolicy="single_host_origin"
            responseType="code"
            redirectUri="postmessage"
            render={(renderProps) => (
              <button
                type="button"
                onClick={renderProps.onClick}
                className="text-center w-full text-sm mt-5 text-gray-500 hover:text-gray-600"
              >
                Or sign in with Google
              </button>
            )}
          />
        </div>
        <Help />
      </div>
    </Wrapper>
  );
}

export default LoginPage;
