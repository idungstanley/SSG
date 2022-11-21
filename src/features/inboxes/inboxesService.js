import request from '../../app/requestNew';

// Update inbox settings
export const updateInboxSettings = async (data) => {
  const currentWorkspaceId = JSON.parse(localStorage.getItem('currentWorkspaceId'));

  const url = `/inboxes/${data.inbox_id}/update-settings`;

  const response = await request({
    url,
    method: 'POST',
    data: {
      name: data.name,
      email_username: data.email_username,
      current_workspace_id: currentWorkspaceId,
    },
  });

  return response;
};

// Pin inbox
export const pinInbox = async (data) => {
  const currentWorkspaceId = JSON.parse(localStorage.getItem('currentWorkspaceId'));

  const url = `/inboxes/${data.inboxId}/pin`;

  const response = await request({
    url,
    method: 'POST',
    data: {
      current_workspace_id: currentWorkspaceId,
    },
  });

  return response;
};

// Unpin inbox
export const unpinInbox = async (data) => {
  const currentWorkspaceId = JSON.parse(localStorage.getItem('currentWorkspaceId'));

  const url = `/inboxes/${data.inboxId}/unpin`;

  const response = await request({
    url,
    method: 'POST',
    data: {
      current_workspace_id: currentWorkspaceId,
    },
  });

  return response;
};
