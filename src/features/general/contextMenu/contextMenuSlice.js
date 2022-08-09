import { createSlice } from '@reduxjs/toolkit';

export const contextMenuSlice = createSlice({
  name: 'contextMenu',
  initialState: {
    anchorPointX: null,
    anchorPointY: null,
    showContextMenu: false,
    contextMenuType: null,
  },
  reducers: {
    resetContextMenu: (state) => {
      state.anchorPointX = null;
      state.anchorPointY = null;
      state.showContextMenu = false;
      state.contextMenuType = null;
    },
    showExplorerFileContextMenu: (state, action) => {
      state.anchorPointX = action.payload.x;
      state.anchorPointY = action.payload.y;
      state.showContextMenu = true;
      state.contextMenuType = 'explorer-file';
    },
    showExplorerFolderContextMenu: (state, action) => {
      state.anchorPointX = action.payload.x;
      state.anchorPointY = action.payload.y;
      state.showContextMenu = true;
      state.contextMenuType = 'explorer-folder';
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  resetContextMenu,
  showExplorerFileContextMenu,
  showExplorerFolderContextMenu,
} = contextMenuSlice.actions;

export default contextMenuSlice.reducer;
