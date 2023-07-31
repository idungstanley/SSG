export const handleEntity = ({
  workSpaceId,
  hubId,
  listId,
  taskId
}: {
  workSpaceId: string | undefined;
  hubId: string | undefined | null;
  listId: string | undefined | null;
  taskId: string | undefined | null;
}) => {
  let urlStr = '';
  if (hubId) urlStr = `/${workSpaceId}/tasks/h/${hubId}`;
  if (listId) urlStr = `/${workSpaceId}/tasks/l/${listId}`;
  if (taskId) urlStr = `/${workSpaceId}/tasks/t/${taskId}`;

  return urlStr;
};
