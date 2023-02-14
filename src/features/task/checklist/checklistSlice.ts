import { createSlice } from "@reduxjs/toolkit";
import { getOneTaskServices } from "../taskService";

interface checklistState {
  checklist: string[];
  triggerChecklistUpdate: boolean;
  triggerItemUpdate: boolean;
  triggerDelChecklist: boolean;
  clickedChecklistId: string;
  clickedChecklistItemId: string;
  triggerDelChecklistItem: boolean;
}

const initialState: checklistState = {
  checklist: [],
  triggerChecklistUpdate: false,
  triggerItemUpdate: false,
  triggerDelChecklist: false,
  clickedChecklistId: "",
  clickedChecklistItemId: "",
  triggerDelChecklistItem: false,
};

export const checklistSlice = createSlice({
  name: "Checklists",
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
    setTriggerDelChecklist(state, { payload }) {
      state.triggerDelChecklist = payload;
    },
    setClickChecklistId(state, { payload }) {
      state.clickedChecklistId = payload;
    },
    setClickChecklistItemId(state, { payload }) {
      state.clickedChecklistItemId = payload;
    },
    setTriggererChecklistItemDel(state, { payload }) {
      state.triggerDelChecklistItem = payload;
    },
  },
});

export const {
  getchecklist,
  setTriggerChecklistUpdate,
  setTriggerItemtUpdate,
  setTriggerDelChecklist,
  setClickChecklistId,
  setTriggererChecklistItemDel,
  setClickChecklistItemId,
} = checklistSlice.actions;

export default checklistSlice.reducer;
