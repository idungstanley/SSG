import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { ITeamMembersAndGroupsReq } from '../workspace/teamMembers.intrfaces';
import { IInboxMembersAccess } from './inbox.interfaces';

// Get inbox access
export const useGetInboxAccess = (inboxId?: string) =>
  useQuery<IInboxMembersAccess>(
    ['inbox_access', inboxId],
    async () =>
      requestNew({
        url: `inboxes/${inboxId}/access`,
        method: 'GET',
      }),
    { enabled: !!inboxId }
  );

// Update inbox settings
export const updateInboxSettingsService = async (data: {
  inboxId?: string;
  name: string;
  emailUsername: string;
}) => {
  const response = requestNew(
    {
      url: `inboxes/${data.inboxId}/update-settings`,
      method: 'POST',
      data: {
        name: data.name,
        email_username: data.emailUsername,
      },
    },
    true
  );
  return response;
};

// Update permissions settings (workspace access level)
export const updateInboxWorkspaceAccessLevelService = async (data: {
  inboxId?: string;
  accessLevelKey: string | null;
}) => {
  const response = requestNew({
    url: `inboxes/${data.inboxId}/access/change-workspace-access-level`,
    method: 'POST',
    params: {
      access_level_key: data.accessLevelKey,
    },
  });
  return response;
};

// Remove team member access from inbox
export const removeTeamMemberInboxAccessService = async (data: {
  inboxId?: string;
  teamMemberId: string;
}) => {
  const response = requestNew({
    url: `inboxes/${data.inboxId}/access/remove-access`,
    method: 'POST',
    params: {
      access_type: 'member',
      access_to_id: data.teamMemberId,
    },
  });
  return response;
};

// Remove team member group access from inbox
export const removeTeamMemberGroupInboxAccessService = async (data: {
  inboxId?: string;
  teamMemberGroupId: string | null;
}) => {
  const response = requestNew({
    url: `inboxes/${data.inboxId}/access/remove-access`,
    method: 'POST',
    params: {
      access_type: 'member-group',
      access_to_id: data.teamMemberGroupId,
    },
  });
  return response;
};

const removeTeamMemberOrGroupAccess = (data: {
  inboxId?: string;
  accessToId: string;
  isGroups: boolean;
}) => {
  const response = requestNew({
    url: `inboxes/${data.inboxId}/access/remove-access`,
    method: 'POST',
    params: {
      access_type: data.isGroups ? 'member-group' : 'member',
      access_to_id: data.accessToId,
    },
  });
  return response;
};

export const useRemoveTeamMemberOrGroupAccess = (inboxId?: string) => {
  const queryClient = useQueryClient();

  return useMutation(removeTeamMemberOrGroupAccess, {
    onSuccess: () => {
      queryClient.invalidateQueries(['inbox_access', inboxId]);
    },
  });
};

// Add team member access to inbox
export const addTeamMemberInboxAccessService = async (data: {
  inboxId?: string;
  teamMemberId: string | null;
  accessLevelKey: string | null;
}) => {
  const response = requestNew({
    url: `inboxes/${data.inboxId}/access/add-access`,
    method: 'POST',
    params: {
      access_type: 'member',
      access_to_id: data.teamMemberId,
      access_level_key: data.accessLevelKey,
    },
  });
  return response;
};

// Add team member group access to inbox
export const addTeamMemberGroupInboxAccessService = async (data: {
  inboxId?: string;
  teamMemberGroupId: string | null;
  accessLevelKey: string | null;
}) => {
  const response = requestNew({
    url: `inboxes/${data.inboxId}/access/add-access`,
    method: 'POST',
    params: {
      access_type: 'member-group',
      access_to_id: data.teamMemberGroupId,
      access_level_key: data.accessLevelKey,
    },
  });
  return response;
};

const addTeamMemberOrGroupAccess = (data: {
  inboxId?: string;
  accessToId: string | null;
  accessLevelKey: string | null;
  isGroups: boolean;
}) => {
  const response = requestNew({
    url: `inboxes/${data.inboxId}/access/add-access`,
    method: 'POST',
    params: {
      access_type: data.isGroups ? 'member-group' : 'member',
      access_to_id: data.accessToId,
      access_level_key: data.accessLevelKey,
    },
  });
  return response;
};

export const useAddTeamMemberOrGroupAccess = (inboxId?: string) => {
  const queryClient = useQueryClient();

  return useMutation(addTeamMemberOrGroupAccess, {
    onSuccess: () => {
      queryClient.invalidateQueries(['inbox_access', inboxId]);
    },
  });
};

export const useGetTeamMembersOrGroups = ({
  query,
  isGroups,
}: {
  query: string;
  isGroups: boolean;
}) => {
  const queryClient = useQueryClient();
  const title = isGroups ? 'team_member_groups' : 'team_members';

  return useInfiniteQuery<ITeamMembersAndGroupsReq>(
    [title, { query }],
    async ({ pageParam = 0 }) => {
      const url = `settings/${title.replaceAll('_', '-')}`;

      return requestNew(
        {
          url,
          method: 'GET',
          params: {
            page: pageParam,
            search: query,
          },
        },
        true
      );
    },
    {
      onSuccess: (data) => {
        if (isGroups) {
          data.pages.map((page) =>
            page.data.team_member_groups?.map((item) =>
              queryClient.setQueryData([title, item.id], item)
            )
          );
        } else {
          data.pages.map((page) =>
            page.data.team_members?.map((item) =>
              queryClient.setQueryData([title, item.id], item)
            )
          );
        }
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
