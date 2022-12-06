/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import {
  registerService,
  loginGoogleService,
} from '../../../features/auth/authService';
import { setAuthData } from '../../../features/auth/authSlice';
import InviteDetails from './components/InviteDetails';
import Form from '../../../components/Form';
import Wrapper from '..';

function RegisterPage() {
  const dispatch = useDispatch();
  const { inviteCode } = useParams();

  const registerMutation = useMutation(registerService, {
    onSuccess: async (successData) => {
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

  const loginGoogleMutation = useMutation(loginGoogleService, {
    onSuccess: async (successData) => {
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
    registerMutation.mutate({
      name: values.name,
      email: values.email,
      password: values.password,
      // inviteCode,
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
        inviteCode,
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
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'Password must be 8 characters or longer!')
        .required('Required'),
    }),
    buttonTitle: 'Sign Up',
  };

  const [firstCheckbox, setFirstCheckbox] = useState(false);
  const [secondCheckbox, setSecondCheckbox] = useState(false);

  const checkboxConfig = [
    {
      id: 'First',
      label: 'Lorem ipsum',
      value: firstCheckbox,
      onChange: (e) => setFirstCheckbox(e.target.value),
    },
    {
      id: 'Second',
      label: 'Lorem ipsum 2 some text some text some text',
      value: secondCheckbox,
      onChange: (e) => setSecondCheckbox(e.target.value),
    },
  ];

  return (
    <Wrapper>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 flex flex-col gap-7">
          <h2 className="text-center text-2xl font-bold">Change me</h2>

          <InviteDetails />

          <Form
            onSubmit={(values) => onSubmit(values)}
            formikConfig={formikConfig}
            checkboxConfig={checkboxConfig}
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
                Or sign up with Google
              </button>
            )}
          />
        </div>
        <div className="absolute bottom-0 -right-16 bg-gray-200 p-2 flex flex-col items-center border bg-opacity-50 rounded-lg">
          <QuestionMarkCircleIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <p className="text-gray-500">Help</p>
        </div>
      </div>
      {/* <div className="flex flex-col justify-center items-center">
        <img className="mx-auto h-12 w-auto" src={MainLogo} alt="Workflow" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Or
          {' '}
          <Hyperlink href="/auth/login" label="sign in to your account" />
        </p>
      </div>

      <div className="mt-8">
        <div>
          <div className="mt-6 relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Continue with</span>
            </div>
          </div>
        </div>

        <InviteDetails />

        <div className="mt-6">
          <div className="space-y-6">
            <Form
              onSubmit={(values) => onSubmit(values)}
              formikConfig={formikConfig}
            />

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
      </div> */}
    </Wrapper>
  );
}

export default RegisterPage;
