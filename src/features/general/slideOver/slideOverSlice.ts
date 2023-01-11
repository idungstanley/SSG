import { itemType } from './../../../types/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type itemAction = {
  action: 'rename' | 'create';
  id: string;
  name?: string;
};

interface SideOverState {
  showCreateInboxSlideOver: boolean;
  showAssignInboxFileSlideOver: boolean;
  showCreateFolderSlideOver: boolean;
  showInviteTeamMemberSlideOver: boolean;
  showMyWorkspacesSlideOver: boolean;
  showCreateTeamMemberGroupSlideOver: boolean;
  showAddGroupTeamMemberSlideOver: boolean;
  showRenameFileSlideOver: boolean;
  showAddTeamMembersOrGroupsSideOver: boolean;
  showWatchersSideOver: boolean;
  itemTypeSideOver: itemType;
  itemActionForSideOver: itemAction | null;
}

const initialState: SideOverState = {
  showCreateInboxSlideOver: false,
  showAssignInboxFileSlideOver: false,
  showCreateFolderSlideOver: false,
  showInviteTeamMemberSlideOver: false,
  showMyWorkspacesSlideOver: false,
  showCreateTeamMemberGroupSlideOver: false,
  showAddGroupTeamMemberSlideOver: false,
  showRenameFileSlideOver: false,
  showAddTeamMembersOrGroupsSideOver: false,
  showWatchersSideOver: false,
  itemTypeSideOver: 'file',
  itemActionForSideOver: null,
};

export const slideOverSlice = createSlice({
  name: 'slideOver',
  initialState,
  reducers: {
    setItemActionForSideOver: (
      state,
      action: PayloadAction<itemAction | null>
    ) => {
      state.itemActionForSideOver = action.payload;
    },
    setCreateInboxSlideOverVisibility: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showCreateInboxSlideOver = action.payload;
    },
    setAssignInboxFileSlideOverVisibility: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showAssignInboxFileSlideOver = action.payload;
    },
    setCreateFolderSlideOverVisibility: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showCreateFolderSlideOver = action.payload;
    },
    setInviteTeamMemberSlideOverVisibility: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showInviteTeamMemberSlideOver = action.payload;
    },
    setMyWorkspacesSlideOverVisibility: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showMyWorkspacesSlideOver = action.payload;
    },
    setCreateTeamMemberGroupSlideOverVisibility: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showCreateTeamMemberGroupSlideOver = action.payload;
    },
    setAddGroupTeamMemberSlideOverVisibility: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showAddGroupTeamMemberSlideOver = action.payload;
    },
    setRenameFileSlideOverVisibility: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showRenameFileSlideOver = action.payload;
    },
    setShowAddTeamMembersOrGroupsSideOver: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showAddTeamMembersOrGroupsSideOver = action.payload;
    },
    setShowWatchersSideOver: (
      state,
      action: PayloadAction<{ type?: itemType; show: boolean }>
    ) => {
      if (action.payload.type) {
        state.showWatchersSideOver = action.payload.show;
        state.itemTypeSideOver = action.payload.type;
      } else {
        state.showWatchersSideOver = action.payload.show;
      }
    },
  },
});

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
  setShowWatchersSideOver,
  setItemActionForSideOver,
} = slideOverSlice.actions;

export default slideOverSlice.reducer;
