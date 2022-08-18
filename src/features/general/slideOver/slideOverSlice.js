import { createSlice } from '@reduxjs/toolkit';

export const slideOverSlice = createSlice({
  name: 'slideOver',
  initialState: {
    showCreateInboxSlideOver: false,
    showAssignInboxFileSlideOver: false,
    showCreateFolderSlideOver: false,
    showCreateFolderTypeSlideOver: false,
    showInviteTeamMemberSlideOver: false,
    showTeamMemberActivityLogSlideOver: false,
    showInboxSettingsSlideOver: false,
    showMyWorkspacesSlideOver: false,
    showTeamMemberGroupMembersSlideOver: false,
    showCreateTeamMemberGroupSlideOver: false,
    showAddInboxTeamMemberSlideOver: false,
    showAddInboxTeamMemberGroupSlideOver: false,
    showAddGroupTeamMemberSlideOver: false,
    showRenameFileSlideOver: false,
    showRenameFolderSlideOver: false,
  },
  reducers: {
    setCreateInboxSlideOverVisibility: (state, action) => {
      state.showCreateInboxSlideOver = action.payload;
    },
    setAssignInboxFileSlideOverVisibility: (state, action) => {
      state.showAssignInboxFileSlideOver = action.payload;
    },
    setCreateFolderSlideOverVisibility: (state, action) => {
      state.showCreateFolderSlideOver = action.payload;
    },
    setCreateFolderTypeSlideOverVisibility: (state, action) => {
      state.showCreateFolderTypeSlideOver = action.payload;
    },
    setInviteTeamMemberSlideOverVisibility: (state, action) => {
      state.showInviteTeamMemberSlideOver = action.payload;
    },
    setTeamMemberActivityLogSlideOverVisibility: (state, action) => {
      state.showTeamMemberActivityLogSlideOver = action.payload;
    },
    setInboxSettingsSlideOverVisibility: (state, action) => {
      state.showInboxSettingsSlideOver = action.payload;
    },
    setMyWorkspacesSlideOverVisibility: (state, action) => {
      state.showMyWorkspacesSlideOver = action.payload;
    },
    setTeamMemberGroupMembersSlideOverVisibility: (state, action) => {
      state.showTeamMemberGroupMembersSlideOver = action.payload;
    },
    setCreateTeamMemberGroupSlideOverVisibility: (state, action) => {
      state.showCreateTeamMemberGroupSlideOver = action.payload;
    },
    setAddInboxTeamMemberSlideOverVisibility: (state, action) => {
      state.showAddInboxTeamMemberSlideOver = action.payload;
    },
    setAddInboxTeamMemberGroupSlideOverVisibility: (state, action) => {
      state.showAddInboxTeamMemberGroupSlideOver = action.payload;
    },
    setAddGroupTeamMemberSlideOverVisibility: (state, action) => {
      state.showAddGroupTeamMemberSlideOver = action.payload;
    },
    setRenameFileSlideOverVisibility: (state, action) => {
      state.showRenameFileSlideOver = action.payload;
    },
    setRenameFolderSlideOverVisibility: (state, action) => {
      state.showRenameFolderSlideOver = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCreateInboxSlideOverVisibility,
  setAssignInboxFileSlideOverVisibility,
  setCreateFolderSlideOverVisibility,
  setCreateFolderTypeSlideOverVisibility,
  setInviteTeamMemberSlideOverVisibility,
  setTeamMemberActivityLogSlideOverVisibility,
  setInboxSettingsSlideOverVisibility,
  setMyWorkspacesSlideOverVisibility,
  setTeamMemberGroupMembersSlideOverVisibility,
  setCreateTeamMemberGroupSlideOverVisibility,
  setAddInboxTeamMemberSlideOverVisibility,
  setAddInboxTeamMemberGroupSlideOverVisibility,
  setAddGroupTeamMemberSlideOverVisibility,
  setRenameFileSlideOverVisibility,
  setRenameFolderSlideOverVisibility,
} = slideOverSlice.actions;

export default slideOverSlice.reducer;
