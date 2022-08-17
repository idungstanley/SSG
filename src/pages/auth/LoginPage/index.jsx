import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { loginService, loginGoogleService } from '../../../features/auth/authService';
import { setCurrentUser } from '../../../features/auth/authSlice';
import {
  Button,
  Input,
  Hyperlink,
} from '../../../components';
import MainLogo from '../../../assets/branding/main-logo.png';

function LoginPage() {
  const dispatch = useDispatch();

  const loginMutation = useMutation(loginService, {
    onSuccess: async (successData) => {
      localStorage.setItem('user', JSON.stringify(successData.data.user));
      localStorage.setItem('accessToken', JSON.stringify(successData.data.token.accessToken));
      localStorage.setItem('currentWorkspaceId', JSON.stringify(successData.data.user.default_workspace_id));

      dispatch(setCurrentUser({
        user: successData.data.user,
        accessToken: successData.data.token.accessToken,
        currentWorkspaceId: successData.data.user.default_workspace_id,
      }));
    },
  });

  const loginGoogleMutation = useMutation(loginGoogleService, {
    onSuccess: async (successData) => {
      localStorage.setItem('user', JSON.stringify(successData.data.user));
      localStorage.setItem('accessToken', JSON.stringify(successData.data.token.accessToken));
      localStorage.setItem('currentWorkspaceId', JSON.stringify(successData.data.user.default_workspace_id));

      dispatch(setCurrentUser({
        user: successData.data.user,
        accessToken: successData.data.token.accessToken,
        currentWorkspaceId: successData.data.user.default_workspace_id,
      }));
    },
  });

  const defaultFormState = {
    email: '',
    password: '',
  };

  const [formState, setFormState] = useState(defaultFormState);

  const { email, password } = formState;

  const onChange = (e) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {
    loginMutation.mutate({
      email,
      password,
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
    console.log(response);
  };

  return (
    <div className="min-h-full flex bg-white">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={MainLogo}
              alt="Workflow"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or
              {' '}
              <Hyperlink
                href="/auth/register"
                label="create your account"
              />
            </p>
          </div>

          <div className="mt-8">
            <div>
              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Continue with</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="space-y-6">
                <Input
                  name="email"
                  label="Email"
                  onChange={onChange}
                  type="email"
                  value={email}
                />

                <Input
                  name="password"
                  label="Password"
                  onChange={onChange}
                  type="password"
                  value={password}
                />

                <div className="flex items-left justify-between">
                  <Hyperlink href="/auth/forgot" label="Forgot your password?" />
                </div>

                <div>
                  <Button
                    buttonStyle="primary"
                    onClick={onSubmit}
                    loading={loginMutation.status === 'loading'}
                    label="Sign in"
                    padding="py-2 px-4"
                    height="h-10"
                    width="w-full"
                  />
                </div>
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  className="rounded-l-md rounded-r-md w-full h-10 py-2 px-4 inline-flex items-center justify-center"
                  buttonText="Log in with Google"
                  onSuccess={handleGoogleLogin}
                  onFailure={handleGoogleFailure}
                  cookiePolicy="single_host_origin"
                  responseType="code"
                  redirectUri="postmessage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80"
          alt=""
        />
      </div>
    </div>
  );
}

export default LoginPage;
