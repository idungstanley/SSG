import { useMutation, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

// Delete service
export const deleteService = async (data: {
  fileIds: string[];
  folderIds: string[];
}) => {
  const response = requestNew({
    url: 'explorer/multiple-delete',
    method: 'POST',
    params: {
      file_ids: data.fileIds,
      folder_ids: data.folderIds,
    },
  });
  return response;
};

// Paste service
export const pasteService = async (data: {
  copyToFolderId?: string;
  fileIds: string[];
  folderIds: string[];
}) => {
  const url =
    data.copyToFolderId == null
      ? '/explorer/copy'
      : `/explorer/copy/${data.copyToFolderId}`;

  const response = requestNew({
    url,
    method: 'POST',
    params: {
      file_ids: data.fileIds,
      folder_ids: data.folderIds,
    },
  });
  return response;
};

const renameItemService = (data: {
  type: string | null;
  id: string | null;
  name: string | null;
}) => {
  const url = `${data.type}s/${data.id}/rename`;
  return requestNew({
    url,
    method: 'POST',
    params: {
      name: data.name,
    },
  });
};

export const useRenameItem = () => {
  const queryClient = useQueryClient();

  return useMutation(renameItemService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['explorer_files_and_folders']); // ! remove this
      queryClient.invalidateQueries(['explorer-folders']);
    },
  });
};

// Create a folder
const createFolder = (data: { folderName: string; parentId?: string }) => {
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

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation(createFolder, {
    onSuccess: () => {
      queryClient.invalidateQueries(['explorer_files_and_folders']); // ! remove this
      queryClient.invalidateQueries(['explorer-folders']);
    },
  });
};
