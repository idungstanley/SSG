import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TagState {
  currentTaskIdForTag: string | null | undefined;
  unAssignTadId: null;
  renameTagId: string | null | undefined;
  showTagColorDialogueBox: boolean;
  currentTagId: string | null | undefined;
}

const initialState: TagState = {
  currentTaskIdForTag: null,
  unAssignTadId: null,
  renameTagId: null,
  showTagColorDialogueBox: false,
  currentTagId: null
};

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    setCurrentTaskIdForTag(state, action: PayloadAction<null | string | undefined>) {
      state.currentTaskIdForTag = action.payload;
    },
    setRenameTagId(state, action: PayloadAction<string | null | undefined>) {
      state.renameTagId = action.payload;
    },
    setShowTagColorDialogBox(state, action: PayloadAction<boolean>) {
      state.showTagColorDialogueBox = action.payload;
    },
    triggerUnassignTag(state, action: PayloadAction<{ unAssignTadId: null; currentTaskIdForTag: null } | null>) {
      if (action.payload === null) {
        state.unAssignTadId = null;
        state.currentTaskIdForTag = null;
      } else {
        state.unAssignTadId = action.payload.unAssignTadId;
        state.currentTaskIdForTag = action.payload.currentTaskIdForTag;
      }
    },
    setCurrentTagId(state, action: PayloadAction<string | null | undefined>) {
      state.currentTagId = action.payload;
    }
  }
});

export const { triggerUnassignTag, setCurrentTaskIdForTag, setRenameTagId, setShowTagColorDialogBox, setCurrentTagId } =
  tagSlice.actions;

export default tagSlice.reducer;
