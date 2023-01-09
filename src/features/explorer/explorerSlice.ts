import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { explorerItemType } from '../../types';
import { logout, switchWorkspace } from '../auth/authSlice';

const fileIdsToPaste: string[] = JSON.parse(
  localStorage.getItem('fileIdsToPaste') || '[]'
);
const folderIdsToPaste: string[] = JSON.parse(
  localStorage.getItem('folderIdsToPaste') || '[]'
);
const selectedSortingId: number = JSON.parse(
  localStorage.getItem('selectedSortingId') || '1'
);
const selectedViewId: number = JSON.parse(
  localStorage.getItem('selectedView') || '1'
);

interface log {
  id: string;
  team_member: {
    colour: string;
    initials: string;
    user: {
      name: string;
    };
  };
  description: string;
  created_at: string;
}
interface ExplorerState {
  selectedItemId: string | null;
  selectedItemType: explorerItemType | null;
  selectedItemLoadingFullDetails: never | false;
  selectedItemFullDetails: {
    folder_activity_logs: log[];
  } | null;
  selectedFileIds: string[];
  selectedFolderIds: string[];
  selectedSortingId: number;
  selectedViewId: number;

  fileIdsToPaste: string[];
  folderIdsToPaste: string[];
}

const initialState: ExplorerState = {
  selectedItemId: null,
  selectedItemType: null,
  selectedItemLoadingFullDetails: false,
  selectedItemFullDetails: null,

  selectedFileIds: [],
  selectedFolderIds: [],
  selectedSortingId,
  selectedViewId,

  fileIdsToPaste,
  folderIdsToPaste,
};

export const explorerSlice = createSlice({
  name: 'explorer',
  initialState,
  reducers: {
    resetSelectedItem: (state) => {
      state.selectedItemId = null;
      state.selectedItemType = null;
      state.selectedItemFullDetails = null;
      state.selectedItemLoadingFullDetails = false;
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
      state.selectedItemFullDetails = null;
      state.selectedItemLoadingFullDetails = false;
    },
    setSelectedFile: (state, action: PayloadAction<{ file_id: string }>) => {
      state.selectedFolderIds = [];
      state.selectedFileIds = [action.payload.file_id];
    },
    setSelectedFolder: (
      state,
      action: PayloadAction<{ folder_id: string }>
    ) => {
      state.selectedFileIds = [];
      state.selectedFolderIds = [action.payload.folder_id];
    },
    addSelectedFile: (state, action: PayloadAction<{ file_id: string }>) => {
      state.selectedFileIds.push(action.payload.file_id);
    },
    addSelectedFolder: (
      state,
      action: PayloadAction<{ folder_id: string }>
    ) => {
      state.selectedFolderIds.push(action.payload.folder_id);
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
      state.selectedItemLoadingFullDetails = false;
      state.selectedItemFullDetails = null;
    },
    setSelectedSorting: (state, action: PayloadAction<number>) => {
      state.selectedSortingId = action.payload;
    },
    setSelectedViewId: (state, action: PayloadAction<number>) => {
      state.selectedViewId = action.payload;
    },
    setCopyItems: (
      state,
      action: PayloadAction<{
        fileIdsToPaste: string[];
        folderIdsToPaste: string[];
      }>
    ) => {
      state.fileIdsToPaste = action.payload.fileIdsToPaste;
      state.folderIdsToPaste = action.payload.folderIdsToPaste;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(switchWorkspace, () => initialState)
      .addCase(logout, () => initialState);
  },
});

export const {
  resetSelectedItem,
  setSelectedItem,
  setSelectedFile,
  setSelectedFolder,
  addSelectedFile,
  addSelectedFolder,
  setSelectedFiles,
  setSelectedFolders,
  resetSelectedFilesAndFolders,
  setSelectedSorting,
  setSelectedViewId,
  setCopyItems,
} = explorerSlice.actions;

export default explorerSlice.reducer;
