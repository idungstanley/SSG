import { IField } from '../../../../../features/list/list.interfaces';

export interface listColumnProps {
  id: string;
  field: string;
  value: string;
  hidden: boolean;
  color?: string | null;
  defaulField: boolean;
}

type OptionalIFields<T> = {
  [K in keyof T]?: T[K];
};

export type ExtendedListColumnProps = listColumnProps & OptionalIFields<IField>;

const DEFAULT_FIELD_VAL = true;

export const columnsHead: ExtendedListColumnProps[] = [
  {
    id: 'name',
    field: 'name',
    value: 'Task',
    hidden: false,
    defaulField: DEFAULT_FIELD_VAL
  },
  {
    id: 'assignees',
    field: 'assignees',
    value: 'Assignees',
    hidden: false,
    defaulField: DEFAULT_FIELD_VAL
  },
  {
    id: 'tags',
    field: 'tags',
    value: 'Tags',
    hidden: true,
    defaulField: DEFAULT_FIELD_VAL
  },
  {
    id: 'priority',
    field: 'priority',
    value: 'Priority',
    hidden: false,
    defaulField: DEFAULT_FIELD_VAL
  },
  {
    id: 'created_at',
    field: 'created_at',
    value: 'Created at',
    hidden: true,
    defaulField: DEFAULT_FIELD_VAL
  },
  {
    id: 'description',
    field: 'description',
    value: 'Description',
    hidden: true,
    defaulField: DEFAULT_FIELD_VAL
  },
  {
    id: 'status',
    field: 'status',
    value: 'Status',
    hidden: false,
    defaulField: DEFAULT_FIELD_VAL
  },
  {
    id: 'start_date',
    field: 'start_date',
    value: 'Start Date',
    hidden: false,
    defaulField: DEFAULT_FIELD_VAL
  },
  {
    id: 'end_date',
    field: 'end_date',
    value: 'End Date',
    hidden: true,
    defaulField: DEFAULT_FIELD_VAL
  },
  {
    id: 'updated_at',
    field: 'updated_at',
    value: 'Updated at',
    hidden: true,
    defaulField: DEFAULT_FIELD_VAL
  },
  {
    id: 'archived_at',
    field: 'archived_at',
    value: 'Archived at',
    hidden: true,
    defaulField: DEFAULT_FIELD_VAL
  }
];
