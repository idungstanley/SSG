import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
// import { IResponseGetHubs } from './hubs.interfaces';

export const useGetHubList = () => {
  const queryClient = useQueryClient();

  return useQuery(
    ['hubs'],
    () =>
      requestNew(
        {
          url: 'hubs',
          method: 'GET',
        },
        false,
        true
      ),
    {
      onSuccess: (data) => {
        console.log(data);
        data.data.hubs.map((hub) =>
          queryClient.setQueryData(['hub', hub.id], hub)
        );
      },
    }
  );
};
