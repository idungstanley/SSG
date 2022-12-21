import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { displayNotification } from '../general/notification/notificationSlice';
import { logout, switchWorkspace } from '../auth/authSlice';

export const copyItems = createAsyncThunk(
  'explorer/copyItems',
  async (data) => {
    localStorage.setItem('fileIdsToPaste', JSON.stringify(data.fileIds));
    localStorage.setItem('folderIdsToPaste', JSON.stringify(data.folderIds));

    const totalItemsCount = data.fileIds.length + data.folderIds.length;

    if (totalItemsCount < 1) {
      return totalItemsCount;
    }

    return totalItemsCount;
  },
);

export const previewFileFullPage = createAsyncThunk(
  'explorer/previewFileFullPage',
  async (data, thunkAPI) => {
    const currentWorkspaceId = JSON.parse(
      localStorage.getItem('currentWorkspaceId'),
    );
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));

    try {
      const url = `/files/${data.fileId}/contents?full_screen=true&current_workspace_id=${currentWorkspaceId}&access_token=${accessToken}`;

      window.open(`${process.env.REACT_APP_API_BASE_URL}/api${url}`, '_blank');

      if (data.cb) {
        data.cb();
      }

      return true;
    } catch (error) {
      thunkAPI.dispatch(
        displayNotification(
          'error',
          'Oops! An unknown error has occurred.',
          null,
          8000,
        ),
      );
      return thunkAPI.rejectWithValue('Oops! An unknown error has occurred.');
    }
  },
);

const fileIdsToPaste = JSON.parse(localStorage.getItem('fileIdsToPaste'));
const folderIdsToPaste = JSON.parse(localStorage.getItem('folderIdsToPaste'));
const selectedSortingId = JSON.parse(localStorage.getItem('selectedSortingId')) || 1;
const selectedViewId = JSON.parse(localStorage.getItem('selectedView')) || 1;

const initialState = {
  selectedItemId: null,
  selectedItemType: null,
  selectedItemLoadingFullDetails: false,
  selectedItemFullDetails: null,

  selectedFileIds: [],
  selectedFolderIds: [],
  selectedSortingId,
  selectedViewId,

  fileIdsToPaste: fileIdsToPaste != null ? fileIdsToPaste : [],
  folderIdsToPaste: folderIdsToPaste != null ? folderIdsToPaste : [],
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
    resetSelectedFilesAndFolders: (state) => {
      state.selectedFileIds = [];
      state.selectedFolderIds = [];
      state.selectedItemId = null;
      state.selectedItemType = null;
      state.selectedItemLoadingFullDetails = false;
      state.selectedItemFullDetails = null;
    },
    setSelectedSorting: (state, action) => {
      state.selectedSortingId = action.payload;
    },
    setSelectedViewId: (state, action) => {
      state.selectedViewId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(copyItems.fulfilled, (state, action) => {
        state.fileIdsToPaste = action.meta.arg.fileIds;
        state.folderIdsToPaste = action.meta.arg.folderIds;
      })
      .addCase(copyItems.rejected, (state) => {
        state.fileIdsToPaste = [];
        state.folderIdsToPaste = [];
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
  resetSelectedFilesAndFolders,
  setSelectedSorting,
  setSelectedViewId,
} = explorerSlice.actions;

export default explorerSlice.reducer;
