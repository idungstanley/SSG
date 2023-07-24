import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { explorerItemType } from '../../types';
import { logout, switchWorkspace } from '../auth/authSlice';

const selectedSortingId = JSON.parse(localStorage.getItem('selectedSortingId') || '1') as number;

interface IFastPreview {
  show: boolean;
  fileId?: string;
}

interface ExplorerState {
  selectedItemId: string | null;
  selectedItemType: explorerItemType | null;

  selectedFileIds: string[];
  selectedFolderIds: string[];
  selectedSortingId: number;
  selectedFolderId: string | null;
  selectedFileId: string | null;
  fastPreview: IFastPreview;

  draggableItem: { id: string; isFile: boolean } | null;
}

const initialState: ExplorerState = {
  selectedItemId: null,
  selectedItemType: null,

  fastPreview: { show: false },
  selectedFileIds: [],
  selectedFolderIds: [],
  selectedFolderId: null,
  selectedFileId: null,
  selectedSortingId,

  draggableItem: null
};

export const explorerSlice = createSlice({
  name: 'explorer',
  initialState,
  reducers: {
    setFastPreview: (state, action: PayloadAction<IFastPreview>) => {
      if (!action.payload.show) {
        state.fastPreview = { show: false };
      } else {
        state.fastPreview = action.payload;
      }
    },
    setDraggableItem: (state, action: PayloadAction<{ id: string; isFile: boolean } | null>) => {
      state.draggableItem = action.payload;
    },
    setSelectedFolderId: (state, action: PayloadAction<string | null>) => {
      state.selectedFolderId = action.payload;
    },
    setSelectedFileId: (state, action: PayloadAction<string | null>) => {
      state.selectedFileId = action.payload;
    },
    resetSelectedFiles: (state) => {
      state.selectedFileId = null;
      state.selectedFileIds = [];
    },
    resetSelectedItem: (state) => {
      state.selectedItemId = null;
      state.selectedItemType = null;
    },
    setSelectedItem: (
      state,
      action: PayloadAction<{
        selectedItemId: string;
        selectedItemType: explorerItemType;
      }>
    ) => {
      state.selectedItemId = action.payload.selectedItemId;
      state.selectedItemType = action.payload.selectedItemType;
    },
    setSelectedFiles: (state, action: PayloadAction<string[]>) => {
      state.selectedFileIds = action.payload;
    },
    setSelectedFolders: (state, action: PayloadAction<string[]>) => {
      state.selectedFolderIds = action.payload;
    },
    resetSelectedFilesAndFolders: (state) => {
      state.selectedFileIds = [];
      state.selectedFolderIds = [];
      state.selectedItemId = null;
      state.selectedItemType = null;
    },
    setSelectedSorting: (state, action: PayloadAction<number>) => {
      state.selectedSortingId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(switchWorkspace, () => initialState).addCase(logout, () => initialState);
  }
});

export const {
  setFastPreview,
  setDraggableItem,
  setSelectedFileId,
  setSelectedFolderId,
  resetSelectedFiles,
  resetSelectedItem,
  setSelectedItem,
  setSelectedFiles,
  setSelectedFolders,
  resetSelectedFilesAndFolders,
  setSelectedSorting
} = explorerSlice.actions;

export default explorerSlice.reducer;
