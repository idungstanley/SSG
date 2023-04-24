import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from '../../../app/hooks';
import requestNew from '../../../app/requestNew';
import { INotificationRes } from './notification.interfaces';
import { setNotificationCount } from './notificationSlice';

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
