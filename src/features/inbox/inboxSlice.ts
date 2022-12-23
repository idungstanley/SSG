import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { displayNotification } from '../general/notification/notificationSlice';
import {
  downloadInboxFile as downloadInboxFileService,
  previewInboxFile as previewInboxFileService,
} from './inboxService';
import { logout, switchWorkspace } from '../auth/authSlice';

export const downloadInboxFile = createAsyncThunk('inbox/inbox-file/download', async (data, thunkAPI) => {
  downloadInboxFileService(data);
  thunkAPI.dispatch(displayNotification('success', 'Starting download...', null, 5000));
  return true;
});

export const previewInboxFileFullPage = createAsyncThunk('inbox/inbox-file/preview', async (data) => {
  previewInboxFileService(data);
  return true;
});

interface inboxState {
  currentInboxId: string | null,

  selectedInboxTabKey: string,
  selectedInboxFileId: string | null,
  selectedInboxFileIndex: number | null,
  searchFoldersQuery: string,
  folderIdsForFiling: string[],
  processingAssignInboxIds: string[],
  assignedInboxIds: string[],
}

const initialState: inboxState = {
  currentInboxId: null,

  selectedInboxTabKey: 'inbox',
  selectedInboxFileId: null,
  selectedInboxFileIndex: 1,

  // Folders for filing
  searchFoldersQuery: '',
  folderIdsForFiling: [],

  // Assign inbox file to other inboxes
  processingAssignInboxIds: [],
  assignedInboxIds: [],
};

export const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    setCurrentInbox: (state, action: PayloadAction<{ inboxId: string }>) => {
      state.currentInboxId = action.payload.inboxId;
      state.selectedInboxFileId = null;
      state.selectedInboxFileIndex = null;
      state.searchFoldersQuery = '';
      state.selectedInboxTabKey = 'inbox';
      state.folderIdsForFiling = [];
    },
    setCurrentInboxFile: (state, action: PayloadAction<{ inboxFileId: string, inboxFileIndex: number }>) => {
      state.selectedInboxFileId = action.payload.inboxFileId;
      state.selectedInboxFileIndex = action.payload.inboxFileIndex;
      state.searchFoldersQuery = '';
      state.folderIdsForFiling = [];

      state.assignedInboxIds = [];
      state.processingAssignInboxIds = [];
    },
    setSelectedInboxTabKey: (state, action) => {
      state.selectedInboxTabKey = action.payload;
    },
    addFolderForFiling: (state, action) => {
      state.folderIdsForFiling.push(action.payload);
    },
    removeFolderForFiling: (state, action) => {
      state.folderIdsForFiling = state.folderIdsForFiling.filter((folderId) => folderId !== action.payload);
    },
    setSearchFoldersQuery: (state, action) => {
      state.searchFoldersQuery = action.payload.query;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(switchWorkspace, () => initialState)
      .addCase(logout, () => initialState);
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentInbox,
  setCurrentInboxFile,
  addFolderForFiling,
  removeFolderForFiling,
  setSelectedInboxTabKey,
  setSearchFoldersQuery,
} = inboxSlice.actions;

export default inboxSlice.reducer;
