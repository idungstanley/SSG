import { ITaskFullList } from '../../../../../features/task/interface.tasks';
export const defaultTaskTemplate: ITaskFullList[] = [
  {
    archived_at: null,
    assignees: [],
    avatar_path: '',
    created_at: '',
    custom_fields: [],
    custom_field_columns: [],
    deleted_at: null,
    closed_subtasks_count: 0,
    descendants_count: 0,
    checklist_items_count: 0,
    checklist_done_items_count: 0,
    has_attachments: false,
    description: null,
    filters: null,
    directory_items: [],
    end_date: null,
    group_assignees: [],
    has_descendants: false,
    id: '0',
    list: {
      id: '',
      name: '',
      parents: { hubs: [], wallets: [], lists: [] }
    },
    list_id: '',
    name: 'Add Subtask',
    parent_id: null,
    priority: '',
    start_date: null,
    status: {
      color: '#AEADAE',
      created_at: '',
      id: '',
      model_id: '',
      model_type: '',
      name: 'Todo',
      position: '',
      type: '',
      updated_at: ''
    },
    tags: [],
    task_statuses: [],
    updated_at: ''
  }
];