import { explorerItemType } from './../../types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

// Paste service
export const pasteService = async (data: {
  copyToFolderId?: string | null;
  fileIds?: string[];
  folderIds?: string[];
}) => {
  const { copyToFolderId, fileIds, folderIds } = data;

  const url = `/explorer/copy${copyToFolderId ? '/' + copyToFolderId : ''}`;

  const response = requestNew({
    url,
    method: 'POST',
    params: {
      file_ids: fileIds,
      folder_ids: folderIds,
    },
  });
  return response;
};

export const useCopyItems = (folderId?: string, isFolder?: boolean) => {
  const queryClient = useQueryClient();

  return useMutation(pasteService, {
    onSuccess: () => {
      if (!isFolder) {
        queryClient.invalidateQueries(['explorer-files', folderId || 'root']);
      } else {
        queryClient.invalidateQueries(
          folderId ? ['explorer-folder', folderId] : ['explorer-folders']
        );
      }
    },
  });
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

export const useCreateFolder = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(createFolder, {
    onSuccess: () => {
      queryClient.invalidateQueries(['explorer-folder', id]);
      queryClient.invalidateQueries(['explorer-folders']);
      queryClient.invalidateQueries(['explorer_files_and_folders']); // ! remove this
    },
  });
};

const deleteExplorerItem = (data: { type: explorerItemType; id: string }) => {
  const response = requestNew({
    url: `${data.type}s/${data.id}`,
    method: 'DELETE',
  });
  return response;
};

export const useDeleteExplorerItem = (id: string, type: explorerItemType) => {
  const queryClient = useQueryClient();

  return useMutation(deleteExplorerItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(['explorer-folder', id]);

      if (type === 'folder') {
        queryClient.invalidateQueries(['explorer-folders']);
      }
    },
  });
};

const moveExplorerItems = (data: {
  targetFolderId: string;
  fileIds?: string[];
  folderIds?: string[];
}) => {
  const { targetFolderId, fileIds, folderIds } = data;

  const response = requestNew({
    url: `explorer/move${targetFolderId ? '/' + targetFolderId : ''}`,
    method: 'POST',
    data: {
      file_ids: fileIds,
      folder_ids: folderIds,
    },
  });
  return response;
};

export const useMoveExplorerItems = () => useMutation(moveExplorerItems);
