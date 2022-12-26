import { useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IInboxMembersReq } from './inbox.interfaces';

// Get inbox access
export const useGetInboxAccess = (inboxId?: string) =>
  useQuery<IInboxMembersReq>(
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
