import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IEmailListReq, IFolderForFilling, IFoldersForFillingReq, IInboxFile, IInboxFileLogsReq, IInboxFilesReq, IResponsibleDataReq } from './inbox.interfaces';

// Get inbox files
export const useGetInboxFiles = ({ inboxId, isArchived }: {inboxId?: string, isArchived: boolean}) => {
  const queryClient = useQueryClient();

  return useInfiniteQuery<IInboxFilesReq>(
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
        data.pages.map((page) =>
          page.data.inbox_files.map((inboxFile) =>
            queryClient.setQueryData(['inbox_file', inboxFile.id], inboxFile)
          )
        );
      },
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.pagination.has_more_pages) {
          return Number(lastPage.data.pagination.page) + 1;
        }

        return false;
      },
    }
  );
};

// Get inbox file
export const useGetInboxFile = (inboxFileId: string | null) => {
  // TODO: If not in cache... get from endpoint (hard get)
  // Default data should use the previously set data TODO check...

  const queryClient = useQueryClient();

  return useQuery<IInboxFile | undefined>(
    ['inbox_file', inboxFileId],
    () => queryClient.getQueryData(['inbox_file', inboxFileId]),
    {
      initialData: () => queryClient.getQueryData(['inbox_file', inboxFileId]),
      enabled: inboxFileId != null,
    }
  );
};

// Get inbox file full details
export const useGetInboxFileFullDetails = (inboxFileId: string) => {
  const url = `inbox-files/${inboxFileId}/details`;
  return useQuery(
    ['inbox_file_full_details', inboxFileId],
    () =>
      requestNew({
        url,
        method: 'GET',
      }),
    {
      select: (data) => data.data.inbox_file,
      enabled: inboxFileId != null,
      staleTime: 0, // So it refetches which inboxes the file is assigned to
    }
  );
};

// Search folders for filing
export const useSearchFoldersForFiling = (query: string) => {
  const queryClient = useQueryClient();

  return useQuery<IFoldersForFillingReq>(
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
        data.data.folders.map((folder) =>
          queryClient.setQueryData(
            ['inbox_folder_search_result', folder.id],
            folder
          )
        );
      },
    }
  );
};

// Get search folders for filing search result
export const useGetSearchFoldersForFilingResult = (folderId: string) => {
  const queryClient = useQueryClient();

  return useQuery<IFolderForFilling | undefined>(
    ['inbox_folder_search_result', folderId],
    () => queryClient.getQueryData(['inbox_folder_search_result', folderId]),
    {
      initialData: () => queryClient.getQueryData(['inbox_folder_search_result', folderId]),
    }
  );
};

// File inbox file
export const fileInboxFileService = async (data: {
  folderIds: string[];
  inboxFileId?: string;
}) => {
  const response = requestNew({
    url: `inbox-files/${data.inboxFileId}/file`,
    method: 'POST',
    params: {
      selected_folder_ids: data.folderIds,
    },
  });
  return response;
};

// Assign / Unassign inbox file
const assignOrUnassignInboxFile = (data: {
  isAssigned: boolean;
  inboxId: string;
  inboxFileId: string | null;
}) => {
  const url = `inbox-files/${data.inboxFileId}/${
    data.isAssigned ? 'unassign' : 'assign'
  }`;
  const params = data.isAssigned
    ? {
        unassign_from_inbox_id: data.inboxId,
      }
    : {
        assign_to_inbox_id: data.inboxId,
      };

  const response = requestNew({
    url,
    method: 'POST',
    params,
  });
  return response;
};

export const useAssignOrUnassignInboxFile = (fileId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation(assignOrUnassignInboxFile, {
    onSuccess: (successData) => {
      queryClient.invalidateQueries([
        'inbox_files',
        successData.data.copied_to_inbox_id,
        { isArchived: 0 },
      ]);
      queryClient.invalidateQueries(['inbox_file_full_details', fileId]);
    },
  });
};

const archiveOrUnarchiveInboxFile = (data: {
  inboxFileId: string;
  type: string;
}) => {
  // type: archive | unarchive

  const response = requestNew({
    url: `inbox-files/${data.inboxFileId}/${data.type}`,
    method: 'POST',
  });
  return response;
};

// Archive inbox file
export const useArchiveOrUnarchiveInboxFile = () => {
  const queryClient = useQueryClient();

  return useMutation(archiveOrUnarchiveInboxFile, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['inbox_file', data.data.inbox_file.id],
        data.data.inbox_file
      );
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
  });
};

// multiple archive / unarchive
export const multipleArchiveOrUnarchiveInboxFiles = (data: {
  type: string;
  fileIdsArr: string[];
  inboxId?: string;
}) => {
  // type: archive / unarchive

  const request = requestNew({
    url: `inboxes/${data.inboxId}/${data.type}-multiple-files`,
    method: 'POST',
    data: {
      inbox_file_ids: data.fileIdsArr,
    },
  });
  return request;
};

export const useMultipleArchiveOrUnArchive = () => {
  const queryClient = useQueryClient();

  return useMutation(multipleArchiveOrUnarchiveInboxFiles, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['inbox_files']);
      queryClient.setQueryData(
        ['inbox_file', data.data.inbox_file.id],
        data.data.inbox_file
      );
    },
  });
};

const fileActivity = (fileId: string) => {
  const request = requestNew({
    url: `inbox-files/${fileId}/activity-logs`,
    method: 'GET',
  });
  return request;
};

export const useGetInboxFileActivity = (fileId: string) =>
  useQuery<IInboxFileLogsReq>([`inbox-${fileId}-activity`], () => fileActivity(fileId));

// responsible inbox team members and groups
export const useGetResponsibleMembersOrGroups = (
  isGroups: boolean,
  inboxId?: string,
) => {
  const query = `responsible-team-${
    isGroups ? 'member-groups' : 'members'
  }-${inboxId}`;
  const url = `inboxes/${inboxId}/responsible-team-${
    isGroups ? 'member-groups' : 'members'
  }`;

  return useQuery<IResponsibleDataReq>([query], () =>
    requestNew({
      url,
      method: 'GET',
    })
  );
};

const createResponsibleMemberOrGroup = (data: {
  isGroups: boolean;
  dataId: string;
  inboxId?: string;
}) => {
  const url = `inboxes/${data.inboxId}/responsible-team-${
    data.isGroups ? 'member-groups' : 'members'
  }`;
  const body = data.isGroups
    ? {
        team_member_group_id: data.dataId,
      }
    : { team_member_id: data.dataId };
  const request = requestNew({
    url,
    method: 'POST',
    data: body,
  });
  return request;
};

export const useCreateResponsibleMemberOrGroup = (
  isGroups: boolean,
  inboxId?: string
) => {
  const queryClient = useQueryClient();
  const query = `responsible-team-${
    isGroups ? 'member-groups' : 'members'
  }-${inboxId}`;

  return useMutation(createResponsibleMemberOrGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries([query]);
    },
  });
};

const deleteResponsibleTeamMemberOrGroup = (data: {
  dataId: string;
  isGroups: boolean;
  inboxId?: string;
}) => {
  const url = `inboxes/${data.inboxId}/responsible-team-${
    data.isGroups ? 'member-groups' : 'members'
  }/${data.dataId}`;

  const request = requestNew({
    url,
    method: 'DELETE',
  });
  return request;
};

export const useDeleteResponsibleMemberOrGroup = (
  isGroups: boolean,
  inboxId?: string
) => {
  const queryClient = useQueryClient();
  const query = `responsible-team-${
    isGroups ? 'member-groups' : 'members'
  }-${inboxId}`;

  return useMutation(deleteResponsibleTeamMemberOrGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries([query]);
    },
  });
};

const deleteInboxFile = (data: { fileId: string | null }) => {
  const request = requestNew({
    url: `inbox-files/${data.fileId}/delete`,
    method: 'POST',
  });
  return request;
};

export const useDeleteInboxFile = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteInboxFile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['inbox_files']);
      queryClient.invalidateQueries(['inboxes']);
    },
  });
};

// email list
export const addEmailToList = (data: { inboxId: string | null; email: string }) => {
  const request = requestNew({
    url: `inboxes/${data.inboxId}/email-list`,
    method: 'POST',
    data: {
      email: data.email,
    },
  });
  return request;
};

export const deleteEmailFromList = (data: {
  inboxId: string | null;
  emailId: string;
}) => {
  const request = requestNew({
    url: `/inboxes/${data.inboxId}/email-list/${data.emailId}`,
    method: 'DELETE',
  });
  return request;
};

export const useGetEmailList = (inboxId: string) =>
  useQuery<IEmailListReq>([`email-list-${inboxId}`], () =>
    requestNew({
      url: `inboxes/${inboxId}/email-list`,
      method: 'GET',
    })
  );

export const useAddEmailToList = (inboxId: string) => {
  const queryClient = useQueryClient();

  return useMutation(addEmailToList, {
    onSuccess: () => {
      queryClient.invalidateQueries([`email-list-${inboxId}`]);
    },
  });
};

export const useDeleteEmailFromList = (inboxId: string) => {
  const queryClient = useQueryClient();

  return useMutation(deleteEmailFromList, {
    onSuccess: () => {
      queryClient.invalidateQueries([`email-list-${inboxId}`]);
    },
  });
};
