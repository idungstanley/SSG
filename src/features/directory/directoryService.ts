import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import {
  IDirectoriesRes,
  IDirectory,
  IDirectoryRes,
} from './directory.interfaces';

export const useGetDirectories = () =>
  useQuery<IDirectoriesRes, unknown, IDirectory[]>(
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
    }
  );

export const useGetDirectory = (id?: string) =>
  useQuery<IDirectoryRes, unknown, IDirectory>(
    ['directory', id],
    () =>
      requestNew(
        {
          url: `directories/${id} `,
          method: 'GET',
        },
        true
      ),
    {
      select: (res) => res.data.directory,
      enabled: !!id,
    }
  );

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
