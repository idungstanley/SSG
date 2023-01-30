import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IDirectoriesRes, IDirectory } from './directory.interfaces';

export const useGetDirectories = () => {
  const queryClient = useQueryClient();

  return useQuery<IDirectoriesRes, unknown, IDirectory[]>(
    ['directory', 'root'],
    () =>
      requestNew(
        {
          url: 'directories',
          method: 'GET',
        },
        true
      ),
    {
      select: (res) => res.data.hubs,
      onSuccess: (res) =>
        res.map((dir) => queryClient.setQueryData(['directory', dir.id], dir)),
    }
  );
};

export const useGetDirectory = (directoryId?: string) => {
  const queryClient = useQueryClient();

  return useQuery<IDirectory | undefined>(
    ['directory', directoryId],
    () => queryClient.getQueryData(['directory', directoryId]),
    {
      initialData: () => queryClient.getQueryData(['directory', directoryId]),
      enabled: !!directoryId,
    }
  );
};

const createDirectory = (data: { name: string; parentId?: string }) => {
  const { name, parentId } = data;

  const response = requestNew(
    {
      url: 'directories',
      method: 'POST',
      params: {
        name,
        parent_id: parentId,
      },
    },
    true
  );
  return response;
};

export const useCreateDirectory = (parentId?: string) => {
  const queryClient = useQueryClient();

  return useMutation(createDirectory, {
    onSuccess: () => {
      if (!parentId) {
        queryClient.invalidateQueries(['directory', 'root']);
      } else {
        // ...
      }
    },
  });
};
