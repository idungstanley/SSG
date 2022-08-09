import { useMutation, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

// Delete file service
export const deleteFileService = async (data) => {
  const response = requestNew({
    url: `files/${data.fileId}`,
    method: 'DELETE',
  });
  return response;
};

export function useDeleteFile() {
  const queryClient = useQueryClient();

  return useMutation((fileId) => deleteFileService({ fileId }), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['explorer_files_and_folders', data.data.deleted_from_folder_id == null ? 'root-folder' : data.data.deleted_from_folder_id]);
    },
  });
}

// Delete folder service
export const deleteFolderService = async (data) => {
  const response = requestNew({
    url: `folders/${data.folderId}`,
    method: 'DELETE',
  });
  return response;
};

export function useDeleteFolder() {
  const queryClient = useQueryClient();

  return useMutation((folderId) => deleteFolderService({ folderId }), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['explorer_files_and_folders', data.data.deleted_from_folder_id == null ? 'root-folder' : data.data.deleted_from_folder_id]);
    },
  });
}
