import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import request from '../../app/request';
import { displayNotification } from '../general/notification/notificationSlice';

export const searchFoldersAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
});

export const searchFilesAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
});

export const searchFoldersSelectors = searchFoldersAdapter.getSelectors((state) => state.search.folders);
export const searchFilesSelectors = searchFilesAdapter.getSelectors((state) => state.search.files);

export const performSearch = createAsyncThunk('search/search', async (data, thunkAPI) => {
  // eslint-disable-next-line no-var
  var url = '';
  const currentWorkspaceId = JSON.parse(localStorage.getItem('currentWorkspaceId'));

  const query = data.query ? data.query : '';
  const resultsType = data.resultsType ? data.resultsType : 'files';
  const contentSearch = data.contentSearch ? data.contentSearch : false;

  if (resultsType === 'files') {
    if (contentSearch === true) {
      url = `/search/files?content_search=true&query=${query}`;
    } else {
      url = `/search/files?content_search=false&query=${query}`;
    }
  } else if (resultsType === 'folders') {
    url = `/search/folders?query=${query}`;
  }

  try {
    const response = await request({
      url,
      method: 'GET',
      params: {
        current_workspace_id: currentWorkspaceId,
      },
    });

    console.log(response);

    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    thunkAPI.dispatch(displayNotification('error', 'Oops! An unknown error has occurred.', null, 8000));
    return thunkAPI.rejectWithValue(message);
  }
});

export const selectItem = createAsyncThunk('search/selectItem', async (data, thunkAPI) => {
  if (data.itemType === 'file' && data.itemId !== null) {
    const url = `/files/${data.itemId}/details`;

    const currentWorkspaceId = JSON.parse(localStorage.getItem('currentWorkspaceId'));

    try {
      const response = await request({
        url,
        method: 'GET',
        params: {
          current_workspace_id: currentWorkspaceId,
        },
      });

      console.log(response);

      return response.data;
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      thunkAPI.dispatch(displayNotification('error', 'Oops! An unknown error has occurred.', null, 8000));
      return thunkAPI.rejectWithValue(message);
    }
  } else {
    return null;
  }
});

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    loading: false,
    search_query: '',
    results_type: 'files',
    search_file_contents: false,
    folders: searchFoldersAdapter.getInitialState(),
    files: searchFilesAdapter.getInitialState(),

    selectedItemId: null,
    selectedItemType: null,
    selectedItemLoadingFullDetails: false,
    selectedItemFullDetails: null,
  },
  reducers: {
    setLoadingState: (state, action) => {
      state.loading = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.search_query = action.payload;
    },
    setResultsType: (state, action) => {
      state.results_type = action.payload;
    },
    setSearchFileContents: (state, action) => {
      state.search_file_contents = action.payload;
    },
    setFolders: (state, action) => {
      searchFoldersAdapter.setAll(state.folders, action.payload);
    },
    setFiles: (state, action) => {
      searchFilesAdapter.setAll(state.files, action.payload);
    },
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedItemId = null;
        state.selectedItemType = null;
        state.selectedItemFullDetails = null;
        state.selectedItemLoadingFullDetails = null;

        if (action.meta.arg.resultsType === 'files') {
          searchFilesAdapter.setAll(state.files, action.payload.files);
        } else if (action.meta.arg.resultsType === 'folders') {
          searchFoldersAdapter.setAll(state.folders, action.payload.folders);
        }
      })
      .addCase(performSearch.rejected, (state) => {
        state.loading = false;
      })
      .addCase(selectItem.pending, (state, action) => {
        state.selectedItemId = action.meta.arg.itemId;
        state.selectedItemType = action.meta.arg.itemType;
        state.selectedItemFullDetails = null;
        state.selectedItemLoadingFullDetails = true;
      })
      .addCase(selectItem.fulfilled, (state, action) => {
        state.selectedItemLoadingFullDetails = false;
        state.selectedItemFullDetails = action.payload;
      })
      .addCase(selectItem.rejected, (state) => {
        state.selectedItemLoadingFullDetails = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoadingState,
  setSearchQuery,
  setResultsType,
  setSearchFileContents,
  setFolders,
  setFiles,
  resetSelectedItem,
  setSelectedItem,
  setSelectedItemFullDetails,
  setSelectedItemLoadingState,
} = searchSlice.actions;

export default searchSlice.reducer;
