import { useQuery } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';
import { INotificationRes, INotificationSettingsRes } from './notification.interfaces';

export const useGetNotificationService = () => {
  return useQuery(
    ['notification'],
    async () => {
      const data = await requestNew<INotificationRes>({
        url: 'notifications',
        method: 'GET'
      });
      return data?.data.notifications;
    }

    // {
    //   enabled: !!data.type && !!data.id,
    //   select: (res) => res.data.activity_logs,
    // }
  );
};

export const GetNotificationSettingsService = () => {
  return useQuery(
    ['notification'],
    async () => {
      const data = await requestNew<INotificationSettingsRes>({
        url: 'notification-settings',
        method: 'GET'
      });
      return data?.data.notification_settings;
    }

    // {
    //   enabled: !!data.type && !!data.id,
    //   select: (res) => res.data.activity_logs,
    // }
  );
};
