import requestNew from '../../app/requestNew';

// Delete service
export const deleteService = async (data) => {
  const response = requestNew({
    url: 'af/explorer/multiple-delete',
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
  const url = data.copyToFolderId == null ? '/af/explorer/copy' : `/af/explorer/copy/${data.copyToFolderId}`;

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

// Rename file service
export const renameFileService = async (data) => requestNew({
  url: `af/files/${data.fileId}/rename`,
  method: 'POST',
  params: {
    name: data.name,
  },
});

// Rename folder service
export const renameFolderService = async (data) => requestNew({
  url: `af/folders/${data.folderId}/rename`,
  method: 'POST',
  params: {
    name: data.name,
  },
});
