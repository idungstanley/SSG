import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { inboxType } from '../../types';
import { IResponseInboxes, IPinnedInboxes, IInbox, IBlackListInboxFilesReq } from './inbox.interfaces';

// Get all inboxes
export const useGetInboxes = () => {
  const queryClient = useQueryClient();

  return useQuery<IResponseInboxes>(
    ['inboxes'],
    () =>
      requestNew({
        url: 'inboxes',
        method: 'GET'
      }),
    {
      onSuccess: (data) => {
        data.data.inboxes.map((inbox) => queryClient.setQueryData(['inbox', inbox.id], inbox));
      }
    }
  );
};

export const useGetActiveInboxes = () => {
  const queryClient = useQueryClient();

  return useQuery<IResponseInboxes>(
    ['active-inboxes'],
    () =>
      requestNew({
        url: 'inboxes',
        method: 'GET'
      }),
    {
      onSuccess: (data) => {
        data.data.inboxes.map((inbox) => queryClient.setQueryData(['active-inbox', inbox.id], inbox));
      }
    }
  );
};

// trashed
export const useGetTrashedInboxes = () => {
  const queryClient = useQueryClient();

  return useQuery<IResponseInboxes>(
    ['trashed-inboxes'],
    () =>
      requestNew({
        url: 'inboxes/trashed',
        method: 'GET'
      }),
    {
      onSuccess: (data) => {
        data.data.inboxes.map((inbox) => queryClient.setQueryData(['trashed-inbox', inbox.id], inbox));
      }
    }
  );
};

// Get inbox
export const useGetInbox = (type: inboxType, inboxId?: string) => {
  const queryClient = useQueryClient();
  const queryName = type ? `${type}-inbox` : 'inbox';

  return useQuery<IInbox | undefined>([queryName, inboxId], () => queryClient.getQueryData([queryName, inboxId]), {
    enabled: !!inboxId,
    initialData: () => queryClient.getQueryData([queryName, inboxId])
  });
};

// archived inboxes
export const useGetArchivedInboxes = () => {
  const queryClient = useQueryClient();

  return useQuery<IResponseInboxes>(
    ['archived-inboxes'],
    () =>
      requestNew({
        url: 'inboxes',
        method: 'GET',
        params: {
          is_archived: 1
        }
      }),
    {
      onSuccess: (data) => {
        data.data.inboxes.map((inbox) => queryClient.setQueryData(['archived-inbox', inbox.id], inbox));
      }
    }
  );
};

// hidden inboxes
export const useGetHiddenInboxes = () => {
  const queryClient = useQueryClient();

  return useQuery<IResponseInboxes>(
    ['hidden-inboxes'],
    () =>
      requestNew({
        url: 'inboxes',
        method: 'GET',
        params: {
          show_hidden: 1
        }
      }),
    {
      onSuccess: (data) => {
        data.data.inboxes.map((inbox) => queryClient.setQueryData(['hidden-inbox', inbox.id], inbox));
      }
    }
  );
};

// Get all pinned inboxes
export const useGetPinnedInboxes = () => {
  const queryClient = useQueryClient();

  return useQuery<IPinnedInboxes>(
    ['pinned-inboxes'],
    async () =>
      requestNew({
        url: 'inboxes/pinned',
        method: 'GET'
      }),
    {
      onSuccess: (data) => {
        data.data.pinned_inboxes.map((inbox) => queryClient.setQueryData(['pinned-inbox', inbox.id], inbox));
      }
    }
  );
};

export const useGetPinnedInbox = (inboxId: string) => {
  // TODO: If not in cache... get from endpoint (hard get)
  // Default data should use the previously set data TODO check...

  const queryClient = useQueryClient();

  return useQuery<IInbox | undefined>(
    ['pinned-inbox', inboxId],
    () => queryClient.getQueryData(['pinned-inbox', inboxId]),
    {
      initialData: () => queryClient.getQueryData(['pinned-inbox', inboxId])
    }
  );
};

// Create inbox
export const createInboxService = async (data: { name: string; emailUsername: string }) => {
  const response = requestNew<{ data: { inbox: { id: string } } }>({
    url: 'inboxes',
    method: 'POST',
    data: {
      name: data.name,
      email_username: data.emailUsername
    }
  });
  return response;
};

const pinOrUnpinInbox = (data: { inboxId: string; isPinned: boolean }) => {
  const response = requestNew({
    url: `inboxes/${data.inboxId}/${data.isPinned ? 'unpin' : 'pin'}`,
    method: 'POST'
  });
  return response;
};

export function usePinOrUnpinInbox() {
  const queryClient = useQueryClient();

  return useMutation(pinOrUnpinInbox, {
    onSuccess: () => {
      queryClient.invalidateQueries(['pinned-inboxes']);
    }
  });
}

// Get total inbox unfiled account
export const useGetInboxUnfiledCount = () =>
  useQuery(['inboxes_unfiled_count'], async () => {
    const data = await requestNew<{ data: { unfiled_count: number } }>({
      url: 'inboxes/unfiled-count',
      method: 'GET'
    });
    return data.data.unfiled_count;
  });

export const markOpenedInbox = (id: string) => {
  const request = requestNew({
    url: `inboxes/${id}/mark-opened`,
    method: 'POST'
  });
  return request;
};

export const useMarkOpenedInbox = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(() => markOpenedInbox(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['active-inboxes']);
    }
  });
};

// hide inbox
export const hideOrUnhideInbox = (data: { id: string; isHidden: boolean }) => {
  const request = requestNew({
    url: `inboxes/${data.id}/${data.isHidden ? 'unhide' : 'hide'}`,
    method: 'POST'
  });
  return request;
};

export const useHideOrUnhideInbox = () => {
  const queryClient = useQueryClient();

  return useMutation(hideOrUnhideInbox, {
    onSuccess: () => {
      queryClient.invalidateQueries(['active-inboxes']);
      queryClient.invalidateQueries(['hidden-inboxes']);
    }
  });
};

// archive inbox
export const archiveOrUnarchiveInbox = (data: { id: string; isArchived: boolean }) => {
  const request = requestNew({
    url: `inboxes/${data.id}/${data.isArchived ? 'unarchive' : 'archive'}`,
    method: 'POST'
  });
  return request;
};

export const useArchiveOrUnarchiveInbox = () => {
  const queryClient = useQueryClient();

  return useMutation(archiveOrUnarchiveInbox, {
    onSuccess: () => {
      queryClient.invalidateQueries(['active-inboxes']);
      queryClient.invalidateQueries(['archived-inboxes']);
    }
  });
};

const restoreOrDeleteInbox = (data: { isDeleted: boolean; inboxId?: string }) => {
  const url = data.isDeleted ? `inboxes/${data.inboxId}/restore` : `inboxes/${data.inboxId}`;
  const method = data.isDeleted ? 'POST' : 'DELETE';
  const request = requestNew({
    url,
    method
  });
  return request;
};

export const useRestoreOrDeleteInbox = () => {
  const queryClient = useQueryClient();

  return useMutation(restoreOrDeleteInbox, {
    onSuccess: () => {
      queryClient.invalidateQueries(['trashed-inboxes']);
      queryClient.invalidateQueries(['active-inboxes']);
    }
  });
};

// responsible inboxes
export const useGetResponsibleInboxes = () => {
  useQuery(['responsible-inbox'], () =>
    requestNew({
      url: 'inboxes/responsible',
      method: 'GET'
    })
  );
};

// blacklist
export const getBlacklistFiles = () => {
  const request = requestNew<IBlackListInboxFilesReq>({
    url: 'blacklist-inbox-files',
    method: 'GET'
  });
  return request;
};

export const useGetBlacklistFiles = () => useQuery(['blacklist-files'], getBlacklistFiles);

const blacklistFile = (data: { type: 'add' | string; fileId: string | null }) => {
  const url = data.type === 'add' ? `inbox-files/${data.fileId}/blacklist` : `blacklist-inbox-files/${data.fileId}`;
  const method = data.type === 'add' ? 'POST' : 'DELETE';
  const request = requestNew({
    url,
    method
  });
  return request;
};

export const useBlacklistFile = () => {
  const queryClient = useQueryClient();

  return useMutation(blacklistFile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['blacklist-files']);
    }
  });
};

// main hook
export const useInboxes = (type: inboxType) => {
  const { data: pinned } = useGetPinnedInboxes();
  const { data: active, status: activeStatus } = useGetActiveInboxes();

  const pinnedIds = pinned?.data.pinned_inboxes.map((i) => i.id);
  const activeIds = active?.data.inboxes.map((i) => i.id);

  if (type === 'active') {
    const activeWithoutPinned = active?.data.inboxes.filter((i) => !pinnedIds?.includes(i.id));

    return { data: activeWithoutPinned, status: activeStatus, type };
  }
  if (type === 'hidden') {
    const { data: hidden, status: hiddenStatus } = useGetHiddenInboxes();

    const hiddenWithoutActive = hidden?.data.inboxes.filter((i) => !activeIds?.includes(i.id));

    return { data: hiddenWithoutActive, status: hiddenStatus, type };
  }
  if (type === 'archived') {
    const { data: archived, status: archivedStatus } = useGetArchivedInboxes();

    const archivedWithoutActive = archived?.data.inboxes.filter((i) => !activeIds?.includes(i.id));

    return { data: archivedWithoutActive, status: archivedStatus, type };
  }
  return { data: null };
};
