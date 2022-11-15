import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { displayNotification } from '../general/notification/notificationSlice';

export const selectItem = createAsyncThunk('shared/selectItem', async (data) => data);

// export const previewFileFullPage = createAsyncThunk('shared/previewFileFullPage', async (data, thunkAPI) => {
//   const currentWorkspaceId = JSON.parse(localStorage.getItem('currentWorkspaceId'));
//   const accessToken = JSON.parse(localStorage.getItem('accessToken'));

//   try {
//     const url = `/files/${data.fileId}/contents?full_screen=true&current_workspace_id=${currentWorkspaceId}&access_token=${accessToken}`;

//     window.open(`${process.env.REACT_APP_API_BASE_URL}/api${url}`, '_blank');

//     if (data.cb) {
//       data.cb();
//     }

//     return true;
//   } catch (error) {
//     thunkAPI.dispatch(displayNotification('error', 'Oops! An unknown error has occurred.', null, 8000));
//     return thunkAPI.rejectWithValue('Oops! An unknown error has occurred.');
//   }
// });

const initialState = {
  selectedItemType: null,
  selectedItemId: null,
  selectedItemFullDetails: null,
  selectedItemLoadingFullDetails: false,
  selectedFileIds: [],
  selectedFolderIds: [],
};

export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItemId = action.payload.selectedItemId;
      state.selectedItemType = action.payload.selectedItemType;
      state.selectedItemFullDetails = null;
      state.selectedItemLoadingFullDetails = false;
    },
    setSelectedItemFullDetails: (state, action) => {
      state.selectedItemFullDetails = action.payload;
    },
    setSelectedFile: (state, action) => {
      state.selectedFolderIds = [];
      state.selectedFileIds = [action.payload.file_id];
    },
    setSelectedFolder: (state, action) => {
      state.selectedFileIds = [];
      state.selectedFolderIds = [action.payload.folder_id];
    },
    resetSelectedItem: (state) => {
      state.selectedItemId = null;
      state.selectedItemType = null;
      state.selectedItemFullDetails = null;
      state.selectedItemLoadingFullDetails = false;
    },
    setSelectedFiles: (state, action) => {
      state.selectedFileIds = action.payload;
    },
    setSelectedFolders: (state, action) => {
      state.selectedFolderIds = action.payload;
    },
    extraReducers: (builder) => {
      builder.addCase(selectItem.pending, (state, action) => {
        state.selectedItemId = action.meta.arg.itemId;
        state.selectedItemType = action.meta.arg.itemType;
      });
    },
  },
});

export const {
  setSelectedItem,
  setSelectedItemFullDetails,
  setSelectedFile,
  setSelectedFolder,
  resetSelectedItem,
  setSelectedFiles,
  setSelectedFolders,
} = sharedSlice.actions;

export default sharedSlice.reducer;
