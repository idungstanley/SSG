export const handleEntity = ({
  workSpaceId,
  hubId,
  listId,
  taskId,
  viewId
}: {
  workSpaceId: string | undefined;
  hubId: string | undefined | null;
  listId: string | undefined | null;
  taskId: string | undefined | null;
  viewId: string | undefined | null;
}) => {
  let urlStr = '';
  if (hubId) urlStr = `/${workSpaceId}/tasks/h/${hubId}/v/${viewId}`;
  if (listId) urlStr = `/${workSpaceId}/tasks/l/${listId}/v/${viewId}`;
  if (taskId) urlStr = `/${workSpaceId}/tasks/t/${taskId}/v/${viewId}`;

  return urlStr;
};
