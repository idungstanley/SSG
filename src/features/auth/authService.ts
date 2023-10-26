import { useMutation, useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IUser } from './authSlice';

//Verify Email address
export const useVerifyEmailService = ({ verificationCode }: { verificationCode: string | undefined }) => {
  const data = requestNew({
    url: `auth/verify-email?code=${verificationCode}`,
    method: 'GET'
  });
  return data;
};

// Forgot password
export const UseForgotPassword = (data: { email: string | null | undefined }) => {
  const { email } = data;
  const response = requestNew({
    url: 'auth/forgot-password',
    method: 'POST',
    data: {
      email
    }
  });
  return response;
};

// Reset password
export const UseResetPassword = (data: { code: string; password?: string; password_confirmation?: string }) => {
  const { code, password, password_confirmation } = data;
  const response = requestNew({
    url: 'auth/reset-password',
    method: 'POST',
    data: {
      reset_password_code: code,
      password,
      password_confirmation
    }
  });
  return response;
};

// Login
const loginService = (data: { email: string; password: string }) => {
  const response = requestNew<{
    data: {
      token: { accessToken: string; token: { user_id: string } };
      user: IUser;
    };
  }>({
    url: 'auth/login',
    method: 'POST',
    data: {
      email: data.email,
      password: data.password
    }
  });
  return response;
};

export const useLoginService = () =>
  useMutation(loginService, {
    onSuccess: (res) => res.data
  });

// Login by Google
const loginGoogleService = (data: { code: string; inviteCode?: string }) => {
  const response = requestNew<{
    data: {
      token: { accessToken: string; token: { user_id: string } };
      user: IUser;
    };
  }>({
    url: 'auth/social/google',
    method: 'POST',
    data: {
      code: data.code,
      invite_code: data.inviteCode
    }
  });
  return response;
};

export const useLoginGoogleService = () =>
  useMutation(loginGoogleService, {
    onSuccess: (res) => res.data
  });

// Register
const registerService = (data: { name: string; email: string; password: string; inviteCode?: string }) => {
  const response = requestNew<{
    data: {
      token: { accessToken: string; token: { user_id: string } };
      user: IUser;
    };
  }>({
    url: 'auth/register',
    method: 'POST',
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password,
      invite_code: data.inviteCode
    }
  });
  return response;
};

export const useRegisterService = () =>
  useMutation(registerService, {
    onSuccess: (res) => res.data
  });

// Logout
export const logoutService = () => {
  const response = requestNew({
    url: 'auth/logout',
    method: 'GET'
  });
  return response;
};

// Get invite by code
export const useGetInviteByCode = (inviteCode?: string) =>
  useQuery(
    ['team_member_invite_details', inviteCode],
    async () =>
      requestNew<{
        data: {
          team_member_invite: {
            email: string;
            id: string;
            name: string;
            workspace: {
              id: string;
              name: string;
              colour: string;
              initials: string;
              last_activty_at: string;
            };
            user: IUser;
          };
        };
      }>({
        url: `auth/invite-details/${inviteCode}`,
        method: 'GET'
      }),
    {
      enabled: !!inviteCode
    }
  );
