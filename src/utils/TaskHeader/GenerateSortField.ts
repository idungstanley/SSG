const HEADER_TITLE = {
  assignee: 'Assignees',
  task: 'Task',
  'Created at': 'Created at',
  'Updated at': 'Updated at',
  'Start Date': 'Start Date',
  'End Date': 'End Date'
};

const HEADER_PARAMS = {
  assignee: 'assignee',
  task: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at',
  start_date: 'start_date',
  end_date: 'end_date'
};

export const generateSortField = (title: string, isDefault: boolean, id?: string) => {
  if (isDefault) {
    return title === HEADER_TITLE.assignee
      ? HEADER_PARAMS.assignee
      : title === HEADER_TITLE.task
      ? HEADER_PARAMS.task
      : title === HEADER_TITLE['Created at']
      ? HEADER_PARAMS.created_at
      : title === HEADER_TITLE['Updated at']
      ? HEADER_PARAMS.updated_at
      : title === HEADER_TITLE['Start Date']
      ? HEADER_PARAMS.start_date
      : title === HEADER_TITLE['End Date']
      ? HEADER_PARAMS.end_date
      : title?.toLowerCase();
  } else {
    return `cus_${id}`;
  }
};
