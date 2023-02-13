import { createSlice } from '@reduxjs/toolkit';
import { getOneTaskServices } from '../taskService';

interface checklistState {
  checklist: string[];
  triggerChecklistUpdate: boolean;
  triggerItemUpdate: boolean;
}

const initialState: checklistState = {
  checklist: [],
  triggerChecklistUpdate: false,
  triggerItemUpdate: false,
};

export const checklistSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getchecklist(state, { payload }) {
      const { data: task } = getOneTaskServices({ task_id: payload });
      const singleTask = task?.data.task;
      const task_checklists = singleTask?.task_checklists;
      state.checklist = task_checklists;
    },
    setTriggerChecklistUpdate(state, { payload }) {
      state.triggerChecklistUpdate = payload;
    },
    setTriggerItemtUpdate(state, { payload }) {
      state.triggerItemUpdate = payload;
    },
  },
});

export const {
  getchecklist,
  setTriggerChecklistUpdate,
  setTriggerItemtUpdate,
} = checklistSlice.actions;

export const selectChecklists = (initialState: {checklist: string[]}) => initialState.checklist;

export default checklistSlice.reducer;
