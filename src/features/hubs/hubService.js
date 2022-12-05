import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

export const createHubService = (data) => {
  const response = requestNew({
    url: 'at/hubs',
    method: 'POST',
    params: {
      name: data.name,
    },
  }, true);
  return response;
};

// get all hubs
export const getHubListService = () => {
  const response = requestNew({
    url: 'at/hubs',
    method: 'GET',
  }, true);
  return response;
};

export const useGetHubList = () => {
  const queryClient = useQueryClient();

  return useQuery(['hubs'], getHubListService, {
    onSuccess: (data) => {
      data.data.hubs.map((hub) => queryClient.setQueryData(['hub', hub.id], hub));
    },
  });
};

export const useCreateHub = () => {
  const queryClient = useQueryClient();
  return useMutation(createHubService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['hubs']);
    },
  });
};
