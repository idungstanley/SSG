import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../app/request';
import { displayNotification } from '../general/notification/notificationSlice';
import { logout, switchWorkspace } from '../auth/authSlice';

export const selectItem = createAsyncThunk('explorer/selectItem', async (data) => data);

export const copyItems = createAsyncThunk('explorer/copyItems', async (data, thunkAPI) => {
  localStorage.setItem('fileIdsToPaste', JSON.stringify(data.fileIds));
  localStorage.setItem('folderIdsToPaste', JSON.stringify(data.folderIds));

  const totalItemsCount = data.fileIds.length + data.folderIds.length;

  if (totalItemsCount < 1) {
    return totalItemsCount;
  }

  thunkAPI.dispatch(displayNotification('success', `Copied ${totalItemsCount > 1 ? `${totalItemsCount} items ` : ' '}to clipboard`, null, 3000, true, false, false));

  return totalItemsCount;
});

export const pasteItems = createAsyncThunk('explorer/pasteItems', async (data, thunkAPI) => {
  const url = data.folderId === null ? '/explorer/copy' : `/explorer/copy/${data.folderId}`;
  const currentWorkspaceId = JSON.parse(localStorage.getItem('currentWorkspaceId'));

  const fileIdsToPaste = JSON.parse(localStorage.getItem('fileIdsToPaste'));
  const folderIdsToPaste = JSON.parse(localStorage.getItem('folderIdsToPaste'));

  const totalItemsCount = fileIdsToPaste.length + folderIdsToPaste.length;

  if (totalItemsCount < 1) {
    thunkAPI.dispatch(displayNotification('error', 'Clipboard is empty', null, 8000));
    return thunkAPI.rejectWithValue('Clipboard is empty');
  }

  try {
    const response = await request({
      url,
      method: 'POST',
      data: {
        file_ids: fileIdsToPaste,
        folder_ids: folderIdsToPaste,
        current_workspace_id: currentWorkspaceId,
      },
    });

    if (response.success === false) {
      thunkAPI.dispatch(displayNotification('error', response.message.title, response.message.body, 8000));
      return thunkAPI.rejectWithValue(response.message.title);
    }

    thunkAPI.dispatch(displayNotification('success', response.message.title, response.message.body, 5000, true, false, false));

    if (data.cb) {
      data.cb();
    }

    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(displayNotification('error', 'Oops! An unknown error has occurred.', null, 8000));
    return thunkAPI.rejectWithValue(message);
  }
});

export const previewFileFullPage = createAsyncThunk('explorer/previewFileFullPage', async (data, thunkAPI) => {
  const currentWorkspaceId = JSON.parse(localStorage.getItem('currentWorkspaceId'));
  const accessToken = JSON.parse(localStorage.getItem('accessToken'));

  try {
    const url = `/files/${data.fileId}/contents?full_screen=true&current_workspace_id=${currentWorkspaceId}&access_token=${accessToken}`;

    window.open(`${process.env.REACT_APP_API_BASE_URL}/api${url}`, '_blank');

    if (data.cb) {
      data.cb();
    }

    return true;
  } catch (error) {
    thunkAPI.dispatch(displayNotification('error', 'Oops! An unknown error has occurred.', null, 8000));
    return thunkAPI.rejectWithValue('Oops! An unknown error has occurred.');
  }
});

const initialState = {
  showUploadModal: false,

  selectedItemId: null,
  selectedItemType: null,
  selectedItemLoadingFullDetails: false,
  selectedItemFullDetails: null,

  selectedFileIds: [],
  selectedFolderIds: [],
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
    setSelectedItem: (state, action) => {
      state.selectedItemId = action.payload.selectedItemId;
      state.selectedItemType = action.payload.selectedItemType;
      state.selectedItemFullDetails = null;
      state.selectedItemLoadingFullDetails = false;
    },
    setSelectedItemFullDetails: (state, action) => {
      state.selectedItemFullDetails = action.payload;
    },
    setSelectedItemLoadingState: (state, action) => {
      state.selectedItemLoadingFullDetails = action.payload;
    },
    setSelectedFile: (state, action) => {
      state.selectedFolderIds = [];
      state.selectedFileIds = [action.payload.file_id];
    },
    setSelectedFolder: (state, action) => {
      state.selectedFileIds = [];
      state.selectedFolderIds = [action.payload.folder_id];
    },
    addSelectedFile: (state, action) => {
      state.selectedFileIds.push(action.payload.file_id);
    },
    addSelectedFolder: (state, action) => {
      state.selectedFolderIds.push(action.payload.folder_id);
    },
    setSelectedFiles: (state, action) => {
      state.selectedFileIds = action.payload;
    },
    setSelectedFolders: (state, action) => {
      state.selectedFolderIds = action.payload;
    },
    setShowUploadModal: (state, action) => {
      state.showUploadModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectItem.pending, (state, action) => {
        state.selectedItemId = action.meta.arg.itemId;
        state.selectedItemType = action.meta.arg.itemType;
      })
      .addCase(switchWorkspace, () => initialState)
      .addCase(logout, () => initialState);
  },
});

// Action creators are generated for each case reducer function
export const {
  resetSelectedItem,
  setSelectedItem,
  setSelectedItemFullDetails,
  setSelectedItemLoadingState,
  setSelectedFile,
  setSelectedFolder,
  addSelectedFile,
  addSelectedFolder,
  setSelectedFiles,
  setSelectedFolders,
  setShowUploadModal,
} = explorerSlice.actions;

export default explorerSlice.reducer;
