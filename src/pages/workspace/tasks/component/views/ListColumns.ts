export interface listColumnProps {
  id: string;
  field: string;
  value: string;
  hidden: boolean;
  color?: string | null;
}

export const columnsHead: listColumnProps[] = [
  {
    id: '1',
    field: 'name',
    value: 'Task',
    hidden: false
  },
  {
    id: '2',
    field: 'assignees',
    value: 'Assignees',
    hidden: false
  },
  {
    id: '3',
    field: 'tags',
    value: 'Tags',
    hidden: true
  },
  {
    id: '4',
    field: 'priority',
    value: 'Priority',
    hidden: false
  },
  {
    id: '5',
    field: 'created_at',
    value: 'Created at',
    hidden: true
  },
  {
    id: '6',
    field: 'description',
    value: 'Description',
    hidden: true
  },
  {
    id: '7',
    field: 'status',
    value: 'Status',
    hidden: false
  },
  {
    id: '8',
    field: 'start_date',
    value: 'Start Date',
    hidden: false
  },
  {
    id: '9',
    field: 'end_date',
    value: 'End Date',
    hidden: true
  },
  {
    id: '10',
    field: 'updated_at',
    value: 'Updated at',
    hidden: true
  },
  {
    id: '11',
    field: 'archived_at',
    value: 'Archived at',
    hidden: true
  }
];
