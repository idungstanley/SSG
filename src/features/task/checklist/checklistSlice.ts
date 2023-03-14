import { ICheckListRes } from './../interface.tasks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface checklistState {
  checklists: ICheckListRes[];
  triggerChecklistUpdate: boolean;
  triggerItemUpdate: boolean;
  clickedChecklistId: string;
  clickedChecklistItemId: string | undefined;
  toggleAssignChecklistItemId: string | null | undefined;
  showChecklistInput: boolean;
  showChecklistItemInput: boolean;
  openChecklistModal: boolean;
  openedDisclosureId: string[];
}

const initialState: checklistState = {
  triggerChecklistUpdate: false,
  triggerItemUpdate: false,
  clickedChecklistId: '',
  clickedChecklistItemId: '',
  toggleAssignChecklistItemId: null,
  showChecklistItemInput: false,
  showChecklistInput: false,
  openChecklistModal: false,
  openedDisclosureId: [],
  checklists: []
};

export const checklistSlice = createSlice({
  name: 'Checklists',
  initialState,
  reducers: {
    setChecklists(state, action: PayloadAction<ICheckListRes[]>) {
      state.checklists = action.payload;
    },
    setTriggerChecklistUpdate(state, action: PayloadAction<boolean>) {
      state.triggerChecklistUpdate = action.payload;
    },
    setTriggerItemtUpdate(state, action: PayloadAction<boolean>) {
      state.triggerItemUpdate = action.payload;
    },
    setClickChecklistId(state, action: PayloadAction<string>) {
      state.clickedChecklistId = action.payload;
    },
    setClickChecklistItemId(state, action: PayloadAction<string | undefined>) {
      state.clickedChecklistItemId = action.payload;
    },
    setToggleAssignChecklistItemId(state, action: PayloadAction<string | null | undefined>) {
      state.toggleAssignChecklistItemId = action.payload;
    },
    setShowChecklistInput(state, action: PayloadAction<boolean>) {
      state.showChecklistInput = action.payload;
    },
    setShowChecklistItemInput(state, action: PayloadAction<boolean>) {
      state.showChecklistItemInput = action.payload;
    },
    setOpenChecklistModal(state, action: PayloadAction<boolean>) {
      state.openChecklistModal = action.payload;
    },
    setOpenedDisclosureId(state, action: PayloadAction<string>) {
      let newArr = [];
      if (state.openedDisclosureId.includes(action.payload)) {
        newArr = state.openedDisclosureId.filter((i) => i !== action.payload);
      } else {
        newArr = [...state.openedDisclosureId, action.payload];
      }
      state.openedDisclosureId = newArr;
    }
  }
});

export const {
  setChecklists,
  setTriggerChecklistUpdate,
  setTriggerItemtUpdate,
  setClickChecklistId,
  setClickChecklistItemId,
  setToggleAssignChecklistItemId,
  setShowChecklistInput,
  setShowChecklistItemInput,
  setOpenChecklistModal,
  setOpenedDisclosureId
} = checklistSlice.actions;

export default checklistSlice.reducer;
