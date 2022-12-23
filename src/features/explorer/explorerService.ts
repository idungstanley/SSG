import { IExplorerFile, IExplorerFilesAndFolders, IExplorerFolder } from './explorer.interfaces';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

// Get folder
export const useGetFolder = (folderId: string | null, enabled = true) => {
  // TODO: If not in cache... get from endpoint (hard get)
  // Default data should use the previously set data TODO check...

  const queryClient = useQueryClient();

  return useQuery<IExplorerFolder | undefined>(
    ['explorer_folder', folderId],
    () => queryClient.getQueryData(['explorer_folder', folderId]),
    {
      enabled: folderId != null && enabled,
      initialData: () =>
        queryClient.getQueryData(['explorer_folder', folderId]),
    }
  );
};

// Get file
export const useGetFile = (fileId: string | null, enabled = true) => {
  // TODO: If not in cache... get from endpoint (hard get)
  // Default data should use the previously set data TODO check...

  const queryClient = useQueryClient();

  return useQuery<IExplorerFile | undefined>(
    ['explorer_file', fileId],
    () => queryClient.getQueryData(['explorer_file', fileId]),
    {
      enabled: fileId != null && enabled,
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
