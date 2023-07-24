import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hub } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { logout, switchWorkspace } from '../auth/authSlice';

interface SearchState {
  searchQuery: string;
  searchFileContents: boolean;
  selectedItemId: null | string;
  selectedItemType: null | string;
  selectedItemPath: null | string;
  isSearchActive: boolean;
  filteredResults: Hub[];
}

const initialState: SearchState = {
  searchQuery: '',
  searchFileContents: false,
  selectedItemId: null,
  selectedItemType: null,
  selectedItemPath: null,
  isSearchActive: false,
  filteredResults: []
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
    setIsSearchActive: (state, action: PayloadAction<boolean>) => {
      state.isSearchActive = action.payload;
    },
    setFilteredResults: (state, action: PayloadAction<Hub[]>) => {
      state.filteredResults = action.payload;
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

export const {
  setSearchQuery,
  setFilteredResults,
  setIsSearchActive,
  setSearchFileContents,
  resetSelectedItem,
  setSelectedItem
} = searchSlice.actions;

export default searchSlice.reducer;
