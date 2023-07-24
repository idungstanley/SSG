import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../../../app/hooks';
import requestNew from '../../../app/requestNew';
import { INotificationRes, INotificationSettingsRes } from './notification.interfaces';
import { setNotificationCount } from './notificationSlice';

interface INotification {
  category: string | undefined;
  type: string | undefined;
  notification_type: string | undefined;
  notification_value: number;
}

export const useGetNotificationService = () => {
  return useQuery(['notificationData'], async () => {
    const data = await requestNew<INotificationRes>({
      url: 'notifications',
      method: 'GET'
    });
    return data?.data?.notifications;
  });
};

export const useGetNotificationCountService = () => {
  const dispatch = useAppDispatch();
  return useQuery(
    ['notification'],
    async () => {
      const data = await requestNew<INotificationRes>({
        url: 'notifications/count-new',
        method: 'GET'
      });
      return data?.data?.count;
    },
    {
      onSuccess: (data) => {
        dispatch(setNotificationCount(data));
      }
    }
  );
};

export const GetNotificationSettingsService = () => {
  return useQuery(['notificationSettings'], async () => {
    const data = await requestNew<INotificationSettingsRes>({
      url: 'notification-settings',
      method: 'GET'
    });
    return data?.data.notification_settings;
  });
};

const changeNotificationSetting = (data: INotification) => {
  const { category, type, notification_type, notification_value } = data;
  const request = requestNew({
    url: 'notification-settings',
    method: 'POST',
    params: {
      category,
      type,
      notification_type,
      notification_value: notification_value === 1 ? 0 : 1
    }
  });
  return request;
};

export const useChangeNotificationSettings = () => {
  const queryClient = useQueryClient();

  return useMutation(changeNotificationSetting, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notificationSettings']);
    }
  });
};
