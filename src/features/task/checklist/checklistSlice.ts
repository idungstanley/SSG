import { createSlice } from '@reduxjs/toolkit';
import { getOneTaskServices } from '../taskService';

interface checklistState {
  checklist: string[];
  triggerChecklistUpdate: boolean;
  triggerItemUpdate: boolean;
  triggerDelChecklist: boolean;
  clickedChecklistId: string;
  clickedChecklistItemId: string;
  triggerDelChecklistItem: boolean;
  toggleAssignChecklistItemId: string | null;
  triggerAssignChecklistItem: boolean;
  triggerUnassignChecklistItem: boolean;
  showChecklistInput: boolean;
}

const initialState: checklistState = {
  checklist: [],
  triggerChecklistUpdate: false,
  triggerItemUpdate: false,
  triggerDelChecklist: false,
  clickedChecklistId: '',
  clickedChecklistItemId: '',
  triggerDelChecklistItem: false,
  toggleAssignChecklistItemId: null,
  triggerAssignChecklistItem: false,
  triggerUnassignChecklistItem: false,
  showChecklistInput: false
};

export const checklistSlice = createSlice({
  name: 'Checklists',
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
    setToggleAssignChecklistItemId(state, { payload }) {
      state.toggleAssignChecklistItemId = payload;
    },
    setTriggerAssignChecklistItem(state, { payload }) {
      state.triggerAssignChecklistItem = payload;
    },
    setTriggerUnassignChecklistItem(state, { payload }) {
      state.triggerUnassignChecklistItem = payload;
    },
    setShowChecklistInput(state, { payload }) {
      state.showChecklistInput = payload;
    }
  }
});

export const {
  getchecklist,
  setTriggerChecklistUpdate,
  setTriggerItemtUpdate,
  setTriggerDelChecklist,
  setClickChecklistId,
  setTriggererChecklistItemDel,
  setClickChecklistItemId,
  setToggleAssignChecklistItemId,
  setTriggerAssignChecklistItem,
  setTriggerUnassignChecklistItem,
  setShowChecklistInput
} = checklistSlice.actions;

export default checklistSlice.reducer;
