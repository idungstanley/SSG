import { useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

// Get inbox access
export const useGetInboxAccess = (inboxId) => useQuery(
  ['inbox_access', inboxId],
  async () => requestNew({
    url: `inboxes/${inboxId}/access`,
    method: 'GET',
  }),
);

// Update inbox settings
export const updateInboxSettingsService = async (data) => {
  const response = requestNew({
    url: `inboxes/${data.inboxId}/update-settings`,
    method: 'POST',
    data: {
      name: data.name,
      email_username: data.emailUsername,
    },
  }, true);
  return response;
};

// Update permissions settings (workspace access level)
export const updateInboxWorkspaceAccessLevelService = async (data) => {
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
export const removeTeamMemberInboxAccessService = async (data) => {
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
export const removeTeamMemberGroupInboxAccessService = async (data) => {
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
export const addTeamMemberInboxAccessService = async (data) => {
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
export const addTeamMemberGroupInboxAccessService = async (data) => {
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
