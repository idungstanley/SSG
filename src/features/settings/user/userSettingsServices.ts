import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';
import { IColourRes, IUserRes } from '../../workspace/workspace.interfaces';
import { setShowConfirmationModal } from './userSettingsSlice';
import { useAppDispatch } from '../../../app/hooks';
import { setColourPaletteData } from '../../account/accountSlice';
import { IPreferenceState } from '../../task/taskSlice';
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
  is_clock_time?: number | null;
  clock_type?: string | null;
  user_preferences?: IPreferenceState;
}

interface IPasswordprops {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

//Get Self
export const useGetSelf = () => {
  const AccessTokenFromLS = JSON.parse(localStorage.getItem('accessToken') || 'null') as string;
  return useQuery(
    ['self'],
    async () => {
      const data = await requestNew<IUserRes | undefined>({
        url: 'user/self',
        method: 'GET'
      });
      return data;
    },
    {
      enabled: !!AccessTokenFromLS
    }
  );
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
  color,
  clock_type,
  is_clock_time,
  user_preferences
}: IUserSettings) => {
  const request = requestNew({
    url: '/auth/account',
    method: 'PUT',
    data: {
      name,
      date_format,
      email,
      start_week,
      theme_color,
      timezone,
      time_format,
      color,
      clock_type,
      is_clock_time,
      user_preferences
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
  const dispatch = useAppDispatch();
  return useMutation(changePassword, {
    onSuccess: () => {
      dispatch(setShowConfirmationModal(false));
    }
  });
};

// Get colours
export const useGetColors = () => {
  const dispatch = useAppDispatch();
  return useQuery(
    ['user-colours'],
    async () => {
      const data = await requestNew<IColourRes>({
        url: 'color-palette',
        method: 'GET'
      });
      return data;
    },
    {
      onSuccess: (data) => {
        const palettData = data.data.palette_colors;
        dispatch(setColourPaletteData(palettData));
      }
    }
  );
};
