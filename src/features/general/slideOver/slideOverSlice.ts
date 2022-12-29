import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showCreateInboxSlideOver: false,
  showAssignInboxFileSlideOver: false,
  showCreateFolderSlideOver: false,
  showInviteTeamMemberSlideOver: false,
  showMyWorkspacesSlideOver: false,
  showCreateTeamMemberGroupSlideOver: false,
  showAddGroupTeamMemberSlideOver: false,
  showRenameFileSlideOver: false,
  showAddTeamMembersOrGroupsSideOver: false,
};

export const slideOverSlice = createSlice({
  name: 'slideOver',
  initialState,
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
    setInviteTeamMemberSlideOverVisibility: (state, action) => {
      state.showInviteTeamMemberSlideOver = action.payload;
    },
    setMyWorkspacesSlideOverVisibility: (state, action) => {
      state.showMyWorkspacesSlideOver = action.payload;
    },
    setCreateTeamMemberGroupSlideOverVisibility: (state, action) => {
      state.showCreateTeamMemberGroupSlideOver = action.payload;
    },
    setAddGroupTeamMemberSlideOverVisibility: (state, action) => {
      state.showAddGroupTeamMemberSlideOver = action.payload;
    },
    setRenameFileSlideOverVisibility: (state, action) => {
      state.showRenameFileSlideOver = action.payload;
    },
    setShowAddTeamMembersOrGroupsSideOver: (state, action) => {
      state.showAddTeamMembersOrGroupsSideOver = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setCreateInboxSlideOverVisibility,
  setAssignInboxFileSlideOverVisibility,
  setCreateFolderSlideOverVisibility,
  setInviteTeamMemberSlideOverVisibility,
  setMyWorkspacesSlideOverVisibility,
  setCreateTeamMemberGroupSlideOverVisibility,
  setAddGroupTeamMemberSlideOverVisibility,
  setRenameFileSlideOverVisibility,
  setShowAddTeamMembersOrGroupsSideOver,
} = slideOverSlice.actions;

export default slideOverSlice.reducer;
