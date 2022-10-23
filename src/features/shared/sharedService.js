import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

export const useGetSharedFiles = () => {
  const queryClient = useQueryClient();

  return useQuery(
    ['shared_files', ('root-file')],
    async () => requestNew({
      url: 'files/shared',
      method: 'GET',
    }),
    {
      onSuccess: (data) => {
        if (data.data.current_file != null) {
          queryClient.setQueryData(['shared_file', data.data.current_file.id], data.data.current_file);
        }
        data.data.files.map((file) => queryClient.setQueryData(['explorer_file', file.id], file));
      },
    },
  );
};

export const useGetSharedFolders = () => {
  const queryClient = useQueryClient();

  return useQuery(
    ['shared_folders', ('root-folder')],
    async () => requestNew({
      url: 'folders/shared',
      method: 'GET',
    }),
    {
      onSuccess: (data) => {
        if (data.data.current_folder != null) {
          queryClient.setQueryData(['shared_folder', data.data.current_folder.id], data.data.current_folder);
        }

        data.data.folders.map((folder) => queryClient.setQueryData(['shared_folder', folder.id], folder));
      },
    },
  );
};
