import { IWatchersRes } from './watchers.interface';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';
import { itemType } from '../../../types';

export const useGetItemWatchers = (data: { type: itemType | null; id: string | null }) =>
  useQuery<IWatchersRes>(
    ['watchers', data.id],
    () =>
      requestNew({
        url: 'watch',
        method: 'GET',
        params: {
          type: data.type,
          id: data.id
        }
      }),
    {
      enabled: !!data.id && !!data.type && data.id !== 'unknown'
      // select: (watchers) => watchers.data.watchers,
    }
  );

const createWatcher = (data: { id: string; team_member_ids: string[]; type: itemType }) => {
  const request = requestNew({
    url: 'watch',
    method: 'POST',
    data: {
      ...data
    }
  });
  return request;
};

export const useCreateWatcher = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(createWatcher, {
    onSuccess: () => {
      queryClient.invalidateQueries(['watchers', id]);
    }
  });
};

const removeWatcher = (data: { id: string; team_member_ids: string[]; type: itemType }) => {
  const request = requestNew({
    url: 'watch/remove',
    method: 'POST',
    data: {
      ...data
    }
  });
  return request;
};

export const useRemoveWatcher = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(removeWatcher, {
    onSuccess: () => {
      queryClient.invalidateQueries(['watchers', id]);
    }
  });
};
