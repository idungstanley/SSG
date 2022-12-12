/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

export const createHubService = (data) => {
  const response = requestNew(
    {
      url: 'at/hubs',
      method: 'POST',
      data: {
        name: data.name,
        current_workspace_id: data.currentWorkspaceId,
      },
    },
    true,
  );
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

export const useGetHubService = (data) => {
  const hubID = data.queryKey[1];
  // console.log(hubID);
  const response = requestNew(
    {
      url: hubID ? `at/hubs/${hubID}` : 'at/hubs',
      method: 'GET',
    },
    true,
  );

  return response;
};
