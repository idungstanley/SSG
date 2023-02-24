import { useQuery } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';

export const useGetNotificationService = () => {
  return useQuery(
    ['notification'],
    async () => {
      const data = await requestNew(
        {
          url: 'notifications',
          method: 'GET',
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
