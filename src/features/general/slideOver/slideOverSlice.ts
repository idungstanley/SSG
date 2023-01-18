import { itemType } from './../../../types/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type itemAction = {
  action: 'rename' | 'create';
  id: string;
  name?: string;
};

type Watchers = {
  show: boolean;
  id?: string;
  type?: itemType;
};

type Comments = {
  show: boolean;
  id?: string;
  type?: itemType;
};

interface SideOverState {
  showCreateInboxSlideOver: boolean;
  showCreateHubSlideOver: boolean;
  showEditHubSlideOver: boolean;
  showCreateWalletSlideOver: boolean;
  showCreateListSlideOver: boolean;
  showCreateTaskSlideOver: boolean;
  showAssignInboxFileSlideOver: boolean;
  showCreateFolderSlideOver: boolean;
  showInviteTeamMemberSlideOver: boolean;
  showMyWorkspacesSlideOver: boolean;
  showCreateTeamMemberGroupSlideOver: boolean;
  showAddGroupTeamMemberSlideOver: boolean;
  showRenameFileSlideOver: boolean;
  showAddTeamMembersOrGroupsSideOver: boolean;
  watchersSideOver: Watchers;
  commentsSideOver: Comments;
  itemActionForSideOver: itemAction | null;
}

const initialState: SideOverState = {
  showCreateInboxSlideOver: false,
  showCreateHubSlideOver: false,
  showEditHubSlideOver: false,
  showCreateWalletSlideOver: false,
  showCreateListSlideOver: false,
  showCreateTaskSlideOver: false,
  showAssignInboxFileSlideOver: false,
  showCreateFolderSlideOver: false,
  showInviteTeamMemberSlideOver: false,
  showMyWorkspacesSlideOver: false,
  showCreateTeamMemberGroupSlideOver: false,
  showAddGroupTeamMemberSlideOver: false,
  showRenameFileSlideOver: false,
  showAddTeamMembersOrGroupsSideOver: false,
  watchersSideOver: { show: false },
  commentsSideOver: { show: false },
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
    setCreateHubSlideOverVisibility: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showCreateHubSlideOver = action.payload;
    },
    setEditHubSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showEditHubSlideOver = action.payload;
    },
    setCreateWalletSlideOverVisibility: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showCreateWalletSlideOver = action.payload;
    },
    setCreateListSlideOverVisibility: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showCreateListSlideOver = action.payload;
    },
    setCreateTaskSlideOverVisibility: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.showCreateTaskSlideOver = action.payload;
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
    setShowWatchersSideOver: (state, action: PayloadAction<Watchers>) => {
      state.watchersSideOver = action.payload;
    },
    setShowCommentsSideOver: (state, action: PayloadAction<Comments>) => {
      state.commentsSideOver = action.payload;
    },
  },
});

export const {
  setCreateInboxSlideOverVisibility,
  setCreateHubSlideOverVisibility,
  setEditHubSlideOverVisibility,
  setCreateWalletSlideOverVisibility,
  setCreateListSlideOverVisibility,
  setCreateTaskSlideOverVisibility,
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
  setShowCommentsSideOver,
} = slideOverSlice.actions;

export default slideOverSlice.reducer;