export const clearUserFromLS = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('currentUserId');
  localStorage.removeItem('user');
  localStorage.removeItem('currentWorkspaceId');
};
