import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    setTriggerChecklistUpdate(state, action: PayloadAction<boolean>) {
      state.triggerChecklistUpdate = action.payload;
    },
    setTriggerItemtUpdate(state, action: PayloadAction<boolean>) {
      state.triggerItemUpdate = action.payload;
    },
    setClickChecklistId(state, action: PayloadAction<string>) {
      state.clickedChecklistId = action.payload;
    },
    setClickChecklistItemId(state, action: PayloadAction<string>) {
      state.clickedChecklistItemId = action.payload;
    },
    setToggleAssignChecklistItemId(state, action: PayloadAction<string | null>) {
      state.toggleAssignChecklistItemId = action.payload;
    },
    setTriggerAssignChecklistItem(state, action: PayloadAction<boolean>) {
      state.triggerAssignChecklistItem = action.payload;
    },
    setTriggerUnassignChecklistItem(state, action: PayloadAction<boolean>) {
      state.triggerUnassignChecklistItem = action.payload;
    },
    setShowChecklistInput(state, action: PayloadAction<boolean>) {
      state.showChecklistInput = action.payload;
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
