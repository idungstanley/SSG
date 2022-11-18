import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

// Get inbox files
export const useGetInboxFiles = ({ inboxId, isArchived }) => {
  const queryClient = useQueryClient();

  return useInfiniteQuery(
    ['inbox_files', inboxId, { isArchived }],
    async ({ pageParam = 0 }) => {
      const url = `inboxes/${inboxId}/inbox-files`;

      return requestNew({
        url,
        method: 'GET',
        params: {
          page: pageParam,
          is_archived: isArchived,
        },
      });
    },
    {
      enabled: inboxId != null && isArchived != null,
      onSuccess: (data) => {
        data.pages.map((page) => page.data.inbox_files.map((inboxFile) => queryClient.setQueryData(['inbox_file', inboxFile.id], inboxFile)));
      },
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.pagination.has_more_pages) {
          return Number(lastPage.data.pagination.page) + 1;
        }

        return false;
      },
    },
  );
};

// Get inbox file
export const useGetInboxFile = (inboxFileId) => {
  // TODO: If not in cache... get from endpoint (hard get)
  // Default data should use the previously set data TODO check...

  const queryClient = useQueryClient();

  return useQuery(
    ['inbox_file', inboxFileId],
    () => queryClient.getQueryData(['inbox_file', inboxFileId]),
    {
      initialData: () => queryClient.getQueryData(['inbox_file', inboxFileId]),
      enabled: inboxFileId != null,
    },
  );
};

// Get inbox file full details
export const useGetInboxFileFullDetails = (inboxFileId) => useQuery(
  ['inbox_file_full_details', inboxFileId],
  async () => {
    const url = `inbox-files/${inboxFileId}/details`;

    return requestNew({
      url,
      method: 'GET',
    });
  },
  {
    select: (data) => data.data.inbox_file_full,
    enabled: inboxFileId != null,
    staleTime: 0, // So it refetches which inboxes the file is assigned to
  },
);

// Search folders for filing
export const useSearchFoldersForFiling = (query) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['inbox_folder_search', query],
    async () => {
      const url = 'search/folders-for-inbox';

      return requestNew({
        url,
        method: 'GET',
        params: {
          query,
        },
      });
    },
    {
      onSuccess: (data) => {
        data.data.folders.map((folder) => queryClient.setQueryData(
          ['inbox_folder_search_result', folder.id],
          folder,
        ));
      },
    },
  );
};

// Get search folders for filing search result
export const useGetSearchFoldersForFilingResult = (folderId) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(['inbox_folder_search_result', folderId]);
};

// File inbox file
export const fileInboxFileService = async (data) => {
  const response = requestNew({
    url: `inbox-files/${data.inboxFileId}/file`,
    method: 'POST',
    params: {
      selected_folder_ids: data.folderIds,
    },
  });
  return response;
};

// Assign inbox file
export const assignInboxFileService = async (data) => {
  const response = requestNew({
    url: `inbox-files/${data.inboxFileId}/assign`,
    method: 'POST',
    params: {
      assign_to_inbox_id: data.assignToInboxId,
    },
  });
  return response;
};

// Unassign inbox file
export const unassignInboxFileService = async (data) => {
  const response = requestNew({
    url: `inbox-files/${data.inboxFileId}/unassign`,
    method: 'POST',
    params: {
      unassign_from_inbox_id: data.unassignFromInboxId,
    },
  });
  return response;
};

// Archive inbox file
export const archiveInboxFileService = async (data) => {
  const response = requestNew({
    url: `inbox-files/${data.inboxFileId}/archive`,
    method: 'POST',
  });
  return response;
};

// Unarchive inbox file
export const unarchiveInboxFileService = async (data) => {
  const response = requestNew({
    url: `inbox-files/${data.inboxFileId}/unarchive`,
    method: 'POST',
  });
  return response;
};

// multiple archive / unarchive
export const multipleArchiveOrUnarchiveInboxFiles = async (
  id,
  fileIdsArr,
  type,
) => {
  // type: archive / unarchive

  const request = await requestNew({
    url: `inboxes/${id}/multiple-files-${type}`,
    method: 'POST',
    params: {
      inbox_file_ids: fileIdsArr,
    },
  });
  return request;
};

export const useMultipleArchiveOrUnArchive = (id, fileIdsArr, type) => {
  const queryClient = useQueryClient();

  return useMutation(
    () => multipleArchiveOrUnarchiveInboxFiles(id, fileIdsArr, type),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([
          'inbox_files',
          data.data.inbox_file.inbox_id,
          { isArchived: 0 },
        ]);
        queryClient.invalidateQueries([
          'inbox_files',
          data.data.inbox_file.inbox_id,
          { isArchived: 1 },
        ]);
      },
    },
  );
};

// Download inbox file
export const downloadInboxFile = async (data) => {
  const currentWorkspaceId = JSON.parse(
    localStorage.getItem('currentWorkspaceId'),
  );
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const url = `/inbox-files/${data.inboxFileId}/download?current_workspace_id=${currentWorkspaceId}&access_token=${accessToken}`;
  window.location.href = `${process.env.REACT_APP_API_BASE_URL}/api${url}`;
};

// Preview file
export const previewInboxFile = async (data) => {
  const currentWorkspaceId = JSON.parse(
    localStorage.getItem('currentWorkspaceId'),
  );
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));
  const url = `/inbox-files/${data.inboxFileId}/contents?full_screen=true&current_workspace_id=${currentWorkspaceId}&access_token=${accessToken}`;
  window.open(`${process.env.REACT_APP_API_BASE_URL}/api/af/${url}`, '_blank');
};

// file comments
export const getInboxFileComments = async (fileId) => {
  const request = await requestNew({
    url: `inbox-files/${fileId}/comments`,
    method: 'GET',
  });
  return request;
};

export const useGetInboxFileComments = (fileId) => {
  const queryClient = useQueryClient();
  return useQuery(
    [`inbox-${fileId}-comments`],
    () => getInboxFileComments(fileId),
    {
      onSuccess: (data) => {
        // console.log(data);
        data.data.comments.map((comment) => queryClient.setQueryData(['comment', comment.id], comment));
      },
    },
  );
};

export const postInboxFileComment = async (fileId, message) => {
  const request = await requestNew({
    url: `inbox-files/${fileId}/comment`,
    method: 'POST',
    data: {
      message,
    },
  });
  return request;
};

export const usePostInboxFileComment = (fileId, message) => {
  const queryClient = useQueryClient();

  return useMutation(() => postInboxFileComment(fileId, message), {
    onSuccess: () => {
      queryClient.invalidateQueries([`inbox-${fileId}-comments`]);
    },
  });
};

export const deleteInboxFileComment = (data) => {
  const request = requestNew({
    url: `inbox-files/${data.fileId}/comment/${data.messageId}`,
    method: 'DELETE',
  });
  return request;
};

export const useDeleteInboxFileComment = (fileId) => {
  const queryClient = useQueryClient();

  return useMutation(deleteInboxFileComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([`inbox-${fileId}-comments`]);
    },
  });
};
