import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SharedState {
  selectedItemType: null | string;
  selectedItemId: null | string;
  selectedFileIds: string[];
  selectedFolderIds: string[];
}

const initialState: SharedState = {
  selectedItemType: null,
  selectedItemId: null,
  selectedFileIds: [],
  selectedFolderIds: []
};

export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setSelectedItem: (
      state,
      action: PayloadAction<{
        selectedItemId: string;
        selectedItemType: string;
      }>
    ) => {
      state.selectedItemId = action.payload.selectedItemId;
      state.selectedItemType = action.payload.selectedItemType;
    },
    setSelectedFile: (state, action: PayloadAction<{ file_id: string }>) => {
      state.selectedFolderIds = [];
      state.selectedFileIds = [action.payload.file_id];
    },
    setSelectedFolder: (state, action: PayloadAction<{ folder_id: string }>) => {
      state.selectedFileIds = [];
      state.selectedFolderIds = [action.payload.folder_id];
    },
    resetSelectedItem: (state) => {
      state.selectedItemId = null;
      state.selectedItemType = null;
    },
    setSelectedFiles: (state, action: PayloadAction<string[]>) => {
      state.selectedFileIds = action.payload;
    },
    setSelectedFolders: (state, action: PayloadAction<string[]>) => {
      state.selectedFolderIds = action.payload;
    }
  }
});

export const {
  setSelectedItem,
  setSelectedFile,
  setSelectedFolder,
  resetSelectedItem,
  setSelectedFiles,
  setSelectedFolders
} = sharedSlice.actions;

export default sharedSlice.reducer;
