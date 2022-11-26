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
