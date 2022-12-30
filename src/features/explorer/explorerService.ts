import { IExplorerFilesAndFolders } from './explorer.interfaces';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IExplorerAndSharedData } from '../shared/shared.interfaces';

// Get folder
export const useGetFolder = (folderId?: string | null) => {
  const queryClient = useQueryClient();

  return useQuery<IExplorerAndSharedData | undefined>(
    ['explorer_folder', folderId],
    () => queryClient.getQueryData(['explorer_folder', folderId]),
    {
      enabled: !!folderId,
      initialData: () =>
        queryClient.getQueryData(['explorer_folder', folderId]),
    }
  );
};

// Get file
export const useGetFile = (fileId?: string | null) => {
  const queryClient = useQueryClient();

  return useQuery<IExplorerAndSharedData | undefined>(
    ['explorer_file', fileId],
    () => queryClient.getQueryData(['explorer_file', fileId]),
    {
      enabled: !!fileId,
      initialData: () => queryClient.getQueryData(['explorer_file', fileId]),
    }
  );
};

// Get all explorer files and folders (for a specific folder)
export const useGetExplorerFilesAndFolders = (folderId?: string) => {
  const queryClient = useQueryClient();

  return useQuery<IExplorerFilesAndFolders>(
    ['explorer_files_and_folders', !folderId ? 'root-folder' : folderId],
    async () =>
      requestNew({
        url: folderId ? `explorer/${folderId}` : 'explorer',
        method: 'GET',
      }),
    {
      enabled: !!folderId,
      onSuccess: (data) => {
        if (data.data.current_folder) {
          queryClient.setQueryData(
            ['explorer_folder', data.data.current_folder.id],
            data.data.current_folder
          );
        }

        data.data.folders.map((folder) =>
          queryClient.setQueryData(['explorer_folder', folder.id], folder)
        );
        data.data.files.map((file) =>
          queryClient.setQueryData(['explorer_file', file.id], file)
        );
      },
    }
  );
};

// Create a folder
export const createFolderService = async (data: {
  folderName: string;
  parentId?: string;
}) => {
  const response = requestNew({
    url: 'folders',
    method: 'POST',
    params: {
      name: data.folderName,
      parent_id: data.parentId,
    },
  });
  return response;
};
