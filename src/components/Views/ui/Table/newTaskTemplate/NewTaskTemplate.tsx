import React from 'react';
import { Task } from '../../../../../features/task/interface.tasks';
import { IField } from '../../../../../features/list/list.interfaces';

interface NewTaskObjProps {
  data: Task[];
  label: string;
  custom_field_columns: IField[];
}

export default function NewTaskTemplate({ data, label, custom_field_columns }: NewTaskObjProps) {
  const newTaskObj = [
    ...data,
    {
      archived_at: null,
      assignees: [],
      checklists: [],
      created_at: Date.now(),
      custom_field_columns,
      custom_fields: [],
      deleted_at: null,
      description: null,
      directory_items: [],
      end_date: null,
      group_assignees: [],
      id: '0',
      list_id: null,
      main_list_id: '',
      name: 'Enter New Task',
      parent_id: null,
      position: null,
      priority: 'normal',
      short_id: '',
      start_date: null,
      status: { name: label, color: data[0].status.color },
      tags: [],
      time_entries_duration: 0,
      updated_at: '',
      watchers_count: 0
    }
  ];
  return newTaskObj;
}
