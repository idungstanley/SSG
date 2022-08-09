/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { displayNotification } from '../general/notification/notificationSlice';
import {
  downloadInboxFile as downloadInboxFileService,
  previewInboxFile as previewInboxFileService,
} from './inboxService';

export const downloadInboxFile = createAsyncThunk('inbox/inbox-file/download', async (data, thunkAPI) => {
  downloadInboxFileService(data);
  thunkAPI.dispatch(displayNotification('success', 'Starting download...', null, 5000));
  return true;
});

export const previewInboxFileFullPage = createAsyncThunk('inbox/inbox-file/preview', async (data) => {
  previewInboxFileService(data);
  return true;
});

export const inboxSlice = createSlice({
  name: 'inbox',
  initialState: {
    currentInboxId: null,

    selectedInboxTabKey: 'inbox',
    selectedInboxFileId: null,
    selectedInboxFileIndex: 1,

    showUploadModal: false,

    // Folders for filing
    searchFoldersQuery: '',
    folderIdsForFiling: [],

    // Assign inbox file to other inboxes
    processingAssignInboxIds: [],
    assignedInboxIds: [],
  },
  reducers: {
    setCurrentInbox: (state, action) => {
      state.currentInboxId = action.payload.inboxId;
      state.selectedInboxFileId = null;
      state.selectedInboxFileIndex = null;
      state.searchFoldersQuery = '';
      state.selectedInboxTabKey = 'inbox';
      state.folderIdsForFiling = [];
    },
    setCurrentInboxFile: (state, action) => {
      state.selectedInboxFileId = action.payload.inboxFileId;
      state.selectedInboxFileIndex = action.payload.inboxFileIndex;
      state.searchFoldersQuery = '';

      state.assignedInboxIds = [];
      state.processingAssignInboxIds = [];
    },
    setShowUploadModal: (state, action) => {
      state.showUploadModal = action.payload;
    },
    setSelectedInboxTabKey: (state, action) => {
      state.selectedInboxTabKey = action.payload;
    },
    addFolderForFiling: (state, action) => {
      state.folderIdsForFiling.push(action.payload);
    },
    removeFolderForFiling: (state, action) => {
      state.folderIdsForFiling = state.folderIdsForFiling.filter((folderId) => folderId != action.payload);
    },
    setSearchFoldersQuery: (state, action) => {
      state.searchFoldersQuery = action.payload.query;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrentInbox,
  setCurrentInboxFile,
  setShowUploadModal,
  addFolderForFiling,
  removeFolderForFiling,
  setInboxFiles,
  removeInboxFile,
  setSelectedInboxTabKey,
  setSearchFoldersQuery,
} = inboxSlice.actions;

export default inboxSlice.reducer;
