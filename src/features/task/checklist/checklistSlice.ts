import { createSlice } from '@reduxjs/toolkit';
import { getOneTaskServices } from '../taskService';

export interface ImyTaskData {
  //   id: string;
  name: string;
  //   description: string | null;
  //   list_id: string;
  //   parent_id: string | null;
  //   priority: string | null;
  //   start_date: string | null;
  //   end_date: string | null;
  //   assignees: string[];
  //   group_assignees: string[];
  //   updated_at: string;
  //   created_at: string;
  //   archived_at: string | null;
  //   deleted_at: string | null;
  //   directory_items: string[];
}

interface checklistState {
  checklist: string[];
}

const initialState: checklistState = {
  checklist: [],
};

export const checklistSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getchecklist(state, { payload }) {
      console.log(state.checklist);
      const { data: task } = getOneTaskServices({ task_id: payload });
      const singleTask = task?.data.task;
      const task_checklists = singleTask?.task_checklists;
      state.checklist = task_checklists;
    },
  },
});

export const { getchecklist } = checklistSlice.actions;

export const selectChecklists = (initialState) => initialState.checklist;

export default checklistSlice.reducer;
