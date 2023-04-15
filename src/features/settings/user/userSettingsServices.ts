import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';
import { IUserRes } from '../../workspace/workspace.interfaces';
// import { useAppDispatch } from '../../../app/hooks';
interface IUserSettings {
  name?: string | undefined;
  date_format?: string;
  email?: string;
  start_week?: string;
  theme_color?: string | null;
  timezone?: string;
  time_format?: string;
  color?: string;
}

interface IPasswordprops {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

//Get Self
export const useGetSelf = () => {
  return useQuery(['self'], async () => {
    const data = await requestNew<IUserRes | undefined>({
      url: 'user/self',
      method: 'GET'
    });
    return data;
  });
};

// Update User Settings
const updateUserSettings = ({
  name,
  theme_color,
  email,
  start_week,
  date_format,
  timezone,
  time_format,
  color
}: IUserSettings) => {
  const request = requestNew({
    url: '/auth/account',
    method: 'PUT',
    params: {
      name,
      date_format,
      email,
      start_week,
      theme_color,
      timezone,
      time_format,
      color
    }
  });
  return request;
};

// Update User Settings Mutation
export const UseUpdateUserSettings = () => {
  const queryClient = useQueryClient();

  return useMutation(updateUserSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries(['self']);
    }
  });
};

// Remove Avatar
export const UseRemoveAvatar = () => {
  const url = '/auth/account/avatar';
  const response = requestNew({
    url,
    method: 'DELETE'
  });
  return response;
};

// Change user password
const changePassword = ({ oldPassword, newPassword, confirmPassword }: IPasswordprops) => {
  const request = requestNew({
    url: '/auth/account/change-password',
    method: 'PUT',
    params: {
      current_password: oldPassword,
      password: newPassword,
      password_confirmation: confirmPassword
    }
  });
  return request;
};

// Update User Settings Mutation
export const UseChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation(changePassword, {
    onSuccess: () => {
      queryClient.invalidateQueries(['self']);
    }
  });
};
