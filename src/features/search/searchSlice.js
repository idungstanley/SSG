import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import request from '../../app/request';
import { displayNotification } from '../general/notification/notificationSlice';

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
    searchQuery: '',
    resultsType: 'files',
    searchFileContents: false,

    selectedItemId: null,
    selectedItemType: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setResultsType: (state, action) => {
      state.resultsType = action.payload;
    },
    setSearchFileContents: (state, action) => {
      state.searchFileContents = action.payload;
    },
    resetSelectedItem: (state) => {
      state.selectedItemId = null;
      state.selectedItemType = null;
    },
    setSelectedItem: (state, action) => {
      state.selectedItemId = action.payload.selectedItemId;
      state.selectedItemType = action.payload.selectedItemType;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectItem.pending, (state, action) => {
        state.selectedItemId = action.meta.arg.itemId;
        state.selectedItemType = action.meta.arg.itemType;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  setSearchQuery,
  setResultsType,
  setSearchFileContents,
  resetSelectedItem,
  setSelectedItem,
} = searchSlice.actions;

export default searchSlice.reducer;
