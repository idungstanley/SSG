import { useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

// Login
export const loginService = (data) => {
  const response = requestNew(
    {
      url: 'auth/login',
      method: 'POST',
      params: {
        email: data.email,
        password: data.password,
      },
    },
    true,
  );
  return response;
};

// Login by Google
export const loginGoogleService = (data) => {
  const response = requestNew(
    {
      url: 'auth/social/google',
      method: 'POST',
      params: {
        code: data.code,
        invite_code: data.inviteCode || '',
      },
    },
    true,
  );
  return response;
};

// Register
export const registerService = (data) => {
  const response = requestNew(
    {
      url: 'auth/register',
      method: 'POST',
      params: {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password,
        invite_code: data.inviteCode,
      },
    },
    true,
  );
  return response;
};

// Logout
export const logoutService = () => {
  const response = requestNew(
    {
      url: 'auth/logout',
      method: 'GET',
    },
    true,
  );
  return response;
};

// Get invite by code
export const useGetInviteByCode = (inviteCode) => useQuery(
  ['team_member_invite_details', inviteCode],
  async () => requestNew({
    url: `auth/invite-details/${inviteCode}`,
    method: 'GET',
  }),
  {
    enabled: inviteCode != null,
  },
);
