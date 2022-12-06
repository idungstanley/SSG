import { useMutation, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

// Delete service
export const deleteService = async (data) => {
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
export const pasteService = async (data) => {
  const url = data.copyToFolderId == null
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

const renameItemService = (data) => {
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
      queryClient.invalidateQueries(['explorer_files_and_folders']);
    },
  });
};

// Rename file service
// export const renameFileService = async (data) => requestNew({
//   url: `files/${data.fileId}/rename`,
//   method: 'POST',
//   params: {
//     name: data.name,
//   },
// });

// // Rename folder service
// export const renameFolderService = async (data) => requestNew({
//   url: `folders/${data.folderId}/rename`,
//   method: 'POST',
//   params: {
//     name: data.name,
//   },
// });
