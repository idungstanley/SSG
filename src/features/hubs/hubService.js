/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

export const createHubService = (data) => {
  const response = requestNew(
    {
      url: 'hubs',
      method: 'POST',
      data: {
        name: data.name,
        current_workspace_id: data.currentWorkspaceId,
      },
    },
    false,
    true,
  );
  return response;
};

// get all hubs
export const useGetHubList = () => {
  const queryClient = useQueryClient();

  return useQuery(
    ['hubs'],
    () => requestNew(
      {
        url: 'hubs',
        method: 'GET',
      },
      false,
      true,
    ),
    {
      onSuccess: (data) => {
        data.data.hubs.map((hub) => queryClient.setQueryData(['hub', hub.id], hub));
      },
    },
  );
};

export const useGetHub = (hubId) => useQuery([`hub-${hubId}`], () => requestNew(
  {
    url: `hubs/${hubId}`,
    method: 'GET',
  },
  false,
  true,
));

export const useCreateHub = () => {
  const queryClient = useQueryClient();
  return useMutation(createHubService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['hubs']);
    },
  });
};
