import { useMutation, useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IUser } from './authSlice';

// Login
const loginService = (data: { email: string; password: string }) => {
  const response = requestNew(
    {
      url: 'auth/login',
      method: 'POST',
      data: {
        email: data.email,
        password: data.password,
      },
    },
    true
  );
  return response;
};

export const useLoginService = () =>
  useMutation(loginService, {
    onSuccess: (res: {
      data: {
        token: { accessToken: string; token: { user_id: string } };
        user: IUser;
      };
    }) => res.data,
  });

// Login by Google
const loginGoogleService = (data: { code: string; inviteCode?: string }) => {
  const response = requestNew(
    {
      url: 'auth/social/google',
      method: 'POST',
      data: {
        code: data.code,
        invite_code: data.inviteCode,
      },
    },
    true
  );
  return response;
};

export const useLoginGoogleService = () =>
  useMutation(loginGoogleService, {
    onSuccess: (res: {
      data: {
        token: { accessToken: string; token: { user_id: string } };
        user: IUser;
      };
    }) => res.data,
  });

// Register
const registerService = (data: {
  name: string;
  email: string;
  password: string;
  inviteCode?: string;
}) => {
  const response = requestNew(
    {
      url: 'auth/register',
      method: 'POST',
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password,
        invite_code: data.inviteCode,
      },
    },
    true
  );
  return response;
};

export const useRegisterService = () =>
  useMutation(registerService, {
    onSuccess: (res: {
      data: {
        token: { accessToken: string; token: { user_id: string } };
        user: IUser;
      };
    }) => res.data,
  });

// Logout
export const logoutService = () => {
  const response = requestNew(
    {
      url: 'auth/logout',
      method: 'GET',
    },
    true
  );
  return response;
};

// Get invite by code
export const useGetInviteByCode = (inviteCode?: string) =>
  useQuery(
    ['team_member_invite_details', inviteCode],
    async () =>
      requestNew({
        url: `auth/invite-details/${inviteCode}`,
        method: 'GET',
      }),
    {
      enabled: !!inviteCode,
    }
  );
