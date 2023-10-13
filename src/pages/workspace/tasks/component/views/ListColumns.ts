export interface listColumnProps {
  id: string;
  field: string;
  value: string;
  hidden: boolean;
  color?: string | null;
}

export const columnsHead: listColumnProps[] = [
  {
    id: 'name',
    field: 'name',
    value: 'Task',
    hidden: false
  },
  {
    id: 'assignees',
    field: 'assignees',
    value: 'Assignees',
    hidden: false
  },
  {
    id: 'tags',
    field: 'tags',
    value: 'Tags',
    hidden: true
  },
  {
    id: 'priority',
    field: 'priority',
    value: 'Priority',
    hidden: false
  },
  {
    id: 'created_at',
    field: 'created_at',
    value: 'Created at',
    hidden: true
  },
  {
    id: 'description',
    field: 'description',
    value: 'Description',
    hidden: true
  },
  {
    id: 'status',
    field: 'status',
    value: 'Status',
    hidden: false
  },
  {
    id: 'start_date',
    field: 'start_date',
    value: 'Start Date',
    hidden: false
  },
  {
    id: 'end_date',
    field: 'end_date',
    value: 'End Date',
    hidden: true
  },
  {
    id: 'updated_at',
    field: 'updated_at',
    value: 'Updated at',
    hidden: true
  },
  {
    id: 'archived_at',
    field: 'archived_at',
    value: 'Archived at',
    hidden: true
  }
];
