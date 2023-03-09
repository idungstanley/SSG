import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../../../../app/requestNew';

export const useGetHubList = () => {
  const queryClient = useQueryClient();

  return useQuery(
    ['hubs'],
    () =>
      requestNew(
        {
          url: 'hubs',
          method: 'GET'
        },
        false,
        true
      ),
    {
      onSuccess: (data) => {
        data.data.hubs.map((hub) => queryClient.setQueryData(['hub', hub.id], hub));
      }
    }
  );
};
