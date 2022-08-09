import { useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

// Login
export const loginService = async (data) => {
  const response = requestNew({
    url: 'auth/login',
    method: 'POST',
    params: {
      email: data.email,
      password: data.password,
    },
  });
  return response;
};

// Register
export const registerService = async (data) => {
  const response = requestNew({
    url: 'auth/register',
    method: 'POST',
    params: {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation,
      invite_code: data.inviteCode,
    },
  });
  return response;
};

// Logout
export const logoutService = async () => {
  const response = requestNew({
    url: 'auth/logout',
    method: 'GET',
  });
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
