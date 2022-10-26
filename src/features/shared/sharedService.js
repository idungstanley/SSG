import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

export const useGetFolder = (folderId, enabled = true) => {
  // TODO: If not in cache... get from endpoint (hard get)
  // Default data should use the previously set data TODO check...

  const queryClient = useQueryClient();

  return useQuery(
    ['shared_folder', folderId],
    () => queryClient.getQueryData(['shared_folder', folderId]),
    {
      enabled: folderId != null && enabled,
      initialData: () => queryClient.getQueryData(['shared_folder', folderId]),
    },
  );
};

// Get file
export const useGetFile = (fileId, enabled = true) => {
  // TODO: If not in cache... get from endpoint (hard get)
  // Default data should use the previously set data TODO check...

  const queryClient = useQueryClient();

  return useQuery(
    ['shared_file', fileId],
    () => queryClient.getQueryData(['shared_file', fileId]),
    {
      enabled: fileId != null && enabled,
      initialData: () => queryClient.getQueryData(['shared_file', fileId]),
    },
  );
};

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
        data.data.files.map((file) => queryClient.setQueryData(['shared_file', file.id], file));
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

export const useGetSharedFilesAndFolders = () => {
  const queryClient = useQueryClient();

  const folders = useQuery(
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
  const files = useQuery(
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

  return {
    data: {
      files: files.data?.data.files,
      filesStatus: files.data?.success,
      folders: folders.data?.data.folders,
      foldersStatus: folders.data?.success,
    },
  };
};

export const prefetchSharedFilesAndFoldersService = (queryClient, folderId) => {
  queryClient.prefetchQuery(
    ['explorer_files_and_folders', (folderId == null ? 'root-folder' : folderId)],
    async () => requestNew({
      url: `explorer/${folderId}`,
      method: 'GET',
    }),
    {
      onSuccess: (data) => {
        if (data.data.current_folder != null) {
          queryClient.setQueryData(['explorer_folder', data.data.current_folder.id], data.data.current_folder);
        }

        data.data.folders.map((folder) => queryClient.setQueryData(['explorer_folder', folder.id], folder));
        data.data.files.map((file) => queryClient.setQueryData(['explorer_file', file.id], file));
      },
    },
  );
};
