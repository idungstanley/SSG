import { useMutation, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';
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
