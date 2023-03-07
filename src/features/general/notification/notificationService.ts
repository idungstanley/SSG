import { useQuery } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';
import { INotificationRes } from './notification.interfaces';

export const useGetNotificationService = () => {
  return useQuery(
    ['notification'],
    async () => {
      const data = await requestNew<INotificationRes>(
        {
          url: 'notifications',
          method: 'GET'
        },
        true
      );
      return data?.data.notifications;
    }

    // {
    //   enabled: !!data.type && !!data.id,
    //   select: (res) => res.data.activity_logs,
    // }
  );
};
