import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { gapi } from 'gapi-script';
import {
  registerService,
  loginGoogleService,
} from '../../../features/auth/authService';
import { setAuthData } from '../../../features/auth/authSlice';
import InviteDetails from './components/InviteDetails';
import Form from '../../../components/Form';
import Wrapper from '..';
import Help from '../Help';
import { formikConfig } from '../../../components/Comments/components/componentType';

function RegisterPage() {
  const dispatch = useDispatch();
  const { inviteCode } = useParams();

  const registerMutation = useMutation(registerService, {
    onSuccess: async (successData) => {
      localStorage.setItem('user', JSON.stringify(successData.data.user));
      localStorage.setItem(
        'accessToken',
        JSON.stringify(successData.data.token.accessToken)
      );
      localStorage.setItem(
        'currentWorkspaceId',
        JSON.stringify(successData.data.user.default_workspace_id)
      );

      dispatch(
        setAuthData({
          user: successData.data.user,
          accessToken: successData.data.token.accessToken,
          currentWorkspaceId: successData.data.user.default_workspace_id,
          currentUserId: successData.data.token.token.user_id,
        })
      );
    },
  });

  const loginGoogleMutation = useMutation(loginGoogleService, {
    onSuccess: async (successData) => {
      localStorage.setItem('user', JSON.stringify(successData.data.user));
      localStorage.setItem(
        'accessToken',
        JSON.stringify(successData.data.token.accessToken)
      );
      localStorage.setItem(
        'currentWorkspaceId',
        JSON.stringify(successData.data.user.default_workspace_id)
      );

      dispatch(
        setAuthData({
          user: successData.data.user,
          accessToken: successData.data.token.accessToken,
          currentWorkspaceId: successData.data.user.default_workspace_id,
          currentUserId: successData.data.token.token.user_id,
        })
      );
    },
  });

  const onSubmit = (values: {
    name?: string;
    email: string;
    password: string;
  }) => {
    registerMutation.mutate({
      name: values.name || '',
      email: values.email,
      password: values.password,
      // inviteCode
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

  const handleGoogleLogin = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if (response.code) {
      loginGoogleMutation.mutate({
        code: response.code,
        inviteCode,
      });
    } else {
      // error handler
    }
  };
  const handleGoogleFailure = (error: unknown) => {
    // fail handler: todo delete console log
    // eslint-disable-next-line no-console
    console.log(error);
  };

  const formikConfig: formikConfig = {
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
      onChange: () => setFirstCheckbox(!firstCheckbox),
    },
    {
      id: 'Second',
      label: 'Lorem ipsum 2 some text some text some text',
      value: secondCheckbox,
      onChange: () => setSecondCheckbox(!secondCheckbox),
    },
  ];

  return (
    <Wrapper>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 flex flex-col gap-7">
          <h2 className="text-center text-2xl font-bold">Let&apos;s go!</h2>

          <InviteDetails />

          <Form
            onSubmit={(values) => onSubmit(values)}
            formikConfig={formikConfig}
            checkboxConfig={checkboxConfig}
          />

          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
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
        <Help />
      </div>
    </Wrapper>
  );
}

export default RegisterPage;
