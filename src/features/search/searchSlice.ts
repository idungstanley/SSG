import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logout, switchWorkspace } from '../auth/authSlice';

interface SearchState {
  searchQuery: string;
  searchFileContents: boolean;
  selectedItemId: null | string;
  selectedItemType: null | string;
  selectedItemPath: null | string;
}

const initialState: SearchState = {
  searchQuery: '',
  searchFileContents: false,
  selectedItemId: null,
  selectedItemType: null,
  selectedItemPath: null
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchFileContents: (state, action: PayloadAction<boolean>) => {
      state.searchFileContents = action.payload;
    },
    resetSelectedItem: (state) => {
      state.selectedItemId = null;
      state.selectedItemType = null;
      state.selectedItemPath = null;
    },
    setSelectedItem: (
      state,
      action: PayloadAction<{
        selectedItemId: null | string;
        selectedItemType: null | string;
        selectedItemPath: null | string;
      }>
    ) => {
      state.selectedItemId = action.payload.selectedItemId;
      state.selectedItemType = action.payload.selectedItemType;
      state.selectedItemPath = action.payload.selectedItemPath;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(switchWorkspace, () => initialState).addCase(logout, () => initialState);
  }
});

export const { setSearchQuery, setSearchFileContents, resetSelectedItem, setSelectedItem } = searchSlice.actions;

export default searchSlice.reducer;
