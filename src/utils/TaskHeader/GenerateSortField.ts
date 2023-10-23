export const generateSortField = (title: string, isDefault: boolean, id?: string) => {
  if (isDefault) {
    return title === 'Assignees'
      ? 'assignee'
      : title === 'Task'
      ? 'name'
      : title === 'Created at'
      ? 'created_at'
      : title === 'Updated at'
      ? 'updated_at'
      : title === 'Start Date'
      ? 'start_date'
      : title === 'End Date'
      ? 'end_date'
      : title?.toLowerCase();
  } else {
    return `cus_${id}`;
  }
};
