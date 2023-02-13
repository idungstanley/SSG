import { useGoogleLogin } from '@react-oauth/google';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { useLoginGoogleService } from '../../../../features/auth/authService';
import { setAuthData } from '../../../../features/auth/authSlice';

interface GoogleLoginProps {
  title: string;
}

export default function GoogleLogin({ title }: GoogleLoginProps) {
  const dispatch = useAppDispatch();
  const { mutate: onGoogleLogin, data } = useLoginGoogleService();

  useEffect(() => {
    if (data) {
      const { user } = data.data;
      const { default_workspace_id } = user;
      const { accessToken, token } = data.data.token;
      const { user_id } = token;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      localStorage.setItem(
        'currentWorkspaceId',
        JSON.stringify(default_workspace_id)
      );
      dispatch(
        setAuthData({
          user,
          accessToken,
          currentWorkspaceId: default_workspace_id,
          currentUserId: user_id,
        })
      );
    }
  }, [data]);

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (tokenResponse) => {
      onGoogleLogin({
        code: tokenResponse.code,
      });
    },
    // eslint-disable-next-line no-console
    onError: (errorResponse) => console.error(errorResponse),
  });

  return (
    <button
      type="button"
      className="w-full mt-5 text-sm text-center text-gray-500 hover:text-gray-600"
      onClick={() => handleGoogleLogin()}
    >
      {title}
    </button>
  );
}
