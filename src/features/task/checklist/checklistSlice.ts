import { createSlice } from '@reduxjs/toolkit';

interface checklistState {
  triggerChecklistUpdate: boolean;
  triggerItemUpdate: boolean;
  clickedChecklistId: string;
  clickedChecklistItemId: string;
  toggleAssignChecklistItemId: string | null;
  triggerAssignChecklistItem: boolean;
  triggerUnassignChecklistItem: boolean;
  showChecklistInput: boolean;
}

const initialState: checklistState = {
  triggerChecklistUpdate: false,
  triggerItemUpdate: false,
  clickedChecklistId: '',
  clickedChecklistItemId: '',
  toggleAssignChecklistItemId: null,
  triggerAssignChecklistItem: false,
  triggerUnassignChecklistItem: false,
  showChecklistInput: false
};

export const checklistSlice = createSlice({
  name: 'Checklists',
  initialState,
  reducers: {
    setTriggerChecklistUpdate(state, { payload }) {
      state.triggerChecklistUpdate = payload;
    },
    setTriggerItemtUpdate(state, { payload }) {
      state.triggerItemUpdate = payload;
    },
    setClickChecklistId(state, { payload }) {
      state.clickedChecklistId = payload;
    },
    setClickChecklistItemId(state, { payload }) {
      state.clickedChecklistItemId = payload;
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
  setTriggerChecklistUpdate,
  setTriggerItemtUpdate,
  setClickChecklistId,
  setClickChecklistItemId,
  setToggleAssignChecklistItemId,
  setTriggerAssignChecklistItem,
  setTriggerUnassignChecklistItem,
  setShowChecklistInput
} = checklistSlice.actions;

export default checklistSlice.reducer;
