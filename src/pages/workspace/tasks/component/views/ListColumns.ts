export interface listColumnProps {
  id: string;
  field: string;
  value: string;
  hidden: boolean;
  color?: string | null;
  defaultField: boolean;
}

export const columnsHead: listColumnProps[] = [
  {
    id: 'name',
    field: 'name',
    value: 'Task',
    hidden: false,
    defaultField: true
  },
  {
    id: 'assignees',
    field: 'assignees',
    value: 'Assignees',
    hidden: false,
    defaultField: true
  },
  {
    id: 'tags',
    field: 'tags',
    value: 'Tags',
    hidden: true,
    defaultField: true
  },
  {
    id: 'priority',
    field: 'priority',
    value: 'Priority',
    hidden: false,
    defaultField: true
  },
  {
    id: 'created_at',
    field: 'created_at',
    value: 'Created at',
    hidden: true,
    defaultField: true
  },
  {
    id: 'description',
    field: 'description',
    value: 'Description',
    hidden: true,
    defaultField: true
  },
  {
    id: 'status',
    field: 'status',
    value: 'Status',
    hidden: false,
    defaultField: true
  },
  {
    id: 'start_date',
    field: 'start_date',
    value: 'Start Date',
    hidden: false,
    defaultField: true
  },
  {
    id: 'end_date',
    field: 'end_date',
    value: 'End Date',
    hidden: true,
    defaultField: true
  },
  {
    id: 'updated_at',
    field: 'updated_at',
    value: 'Updated at',
    hidden: true,
    defaultField: true
  },
  {
    id: 'archived_at',
    field: 'archived_at',
    value: 'Archived at',
    hidden: true,
    defaultField: true
  }
];
