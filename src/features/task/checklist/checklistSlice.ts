import { createSlice } from "@reduxjs/toolkit";
import { getOneTaskServices } from "../taskService";

interface checklistState {
  checklist: any[];
  triggerChecklistUpdate: boolean;
  triggerItemUpdate: boolean;
}

const initialState: checklistState = {
  checklist: [],
  triggerChecklistUpdate: false,
  triggerItemUpdate: false,
};

export const checklistSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getchecklist(state, { payload }) {
      console.log(state.checklist);
      const { data: task, status } = getOneTaskServices({ task_id: payload });
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

export const selectChecklists = (initialState) => initialState.checklist;

export default checklistSlice.reducer;
