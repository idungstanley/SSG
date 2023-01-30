import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IDirectoriesRes, IDirectory } from './directory.interfaces';

export const useGetDirectories = () =>
  useQuery<IDirectoriesRes, unknown, IDirectory[]>(
    ['directory', 'root'],
    () =>
      requestNew({
        url: 'directories',
        method: 'GET',
      }),
    {
      select: (res) => res.data.hubs,
    }
  );

const createDirectory = (data: { name: string; parentId?: string }) => {
  const { name, parentId } = data;

  const response = requestNew({
    url: 'directories',
    method: 'POST',
    params: {
      name,
      parent_id: parentId,
    },
  });
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
