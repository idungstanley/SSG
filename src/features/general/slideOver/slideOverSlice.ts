import { itemType, explorerItemType } from './../../../types/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type itemAction = {
  action: 'rename' | 'create';
  id: string;
  name?: string;
};

type HubItemType = 'hub' | 'subHub' | 'wallet' | 'subwallet' | 'sub2wallet' | 'list' | 'task';

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

type Share = {
  show: boolean;
  id?: string;
  type?: explorerItemType;
};

export type Pilot = {
  show: boolean;
  id?: string;
  type?: itemType | string;
  title?: string;
};
type PilotHub = {
  show: boolean;
  id?: string;
  type?: HubItemType;
};

interface SideOverState {
  showCreateInboxSlideOver: boolean;
  showCreateHubSlideOver: boolean;
  showEditHubSlideOver: boolean;
  showEditListSlideOver: boolean;
  showCreateWalletSlideOver: boolean;
  showCreateSubWalletSlideOver: boolean;
  showCreateSubHubSlideOver: boolean;
  showEditWalletSlideOver: boolean;
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
  shareSideOver: Share;
  pilotSideOver: Pilot;
  pilotSideOverHub: PilotHub;
  itemActionForSideOver: itemAction | null;
  showCreateDirectorySlideOver: boolean;
  showFilterByAssigneeSlideOver: boolean;
}

const initialState: SideOverState = {
  showCreateDirectorySlideOver: false,
  showCreateInboxSlideOver: false,
  showCreateHubSlideOver: false,
  showEditHubSlideOver: false,
  showEditListSlideOver: false,
  showCreateSubHubSlideOver: false,
  showCreateWalletSlideOver: false,
  showCreateSubWalletSlideOver: false,
  showEditWalletSlideOver: false,
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
  shareSideOver: { show: false },
  pilotSideOver: { show: false },
  pilotSideOverHub: { show: true },
  itemActionForSideOver: null,
  showFilterByAssigneeSlideOver: false
};

export const slideOverSlice = createSlice({
  name: 'slideOver',
  initialState,
  reducers: {
    setShowCreateDirectorySlideOver: (state, action: PayloadAction<boolean>) => {
      state.showCreateDirectorySlideOver = action.payload;
    },
    setItemActionForSideOver: (state, action: PayloadAction<itemAction | null>) => {
      state.itemActionForSideOver = action.payload;
    },
    setCreateInboxSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showCreateInboxSlideOver = action.payload;
    },
    setCreateHubSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showCreateHubSlideOver = action.payload;
    },
    setEditListSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showEditListSlideOver = action.payload;
    },
    setEditHubSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showEditHubSlideOver = action.payload;
    },
    setCreateWalletSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showCreateWalletSlideOver = action.payload;
    },
    setCreateSubWalletSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showCreateSubWalletSlideOver = action.payload;
    },
    setCreateSubHubSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showCreateSubHubSlideOver = action.payload;
    },
    setEditWalletSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showEditWalletSlideOver = action.payload;
    },
    setCreateListSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showCreateListSlideOver = action.payload;
    },
    setCreateTaskSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showCreateTaskSlideOver = action.payload;
    },
    setAssignInboxFileSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showAssignInboxFileSlideOver = action.payload;
    },
    setCreateFolderSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showCreateFolderSlideOver = action.payload;
    },
    setInviteTeamMemberSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showInviteTeamMemberSlideOver = action.payload;
    },
    setMyWorkspacesSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showMyWorkspacesSlideOver = action.payload;
    },
    setCreateTeamMemberGroupSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showCreateTeamMemberGroupSlideOver = action.payload;
    },
    setAddGroupTeamMemberSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showAddGroupTeamMemberSlideOver = action.payload;
    },
    setRenameFileSlideOverVisibility: (state, action: PayloadAction<boolean>) => {
      state.showRenameFileSlideOver = action.payload;
    },
    setShowAddTeamMembersOrGroupsSideOver: (state, action: PayloadAction<boolean>) => {
      state.showAddTeamMembersOrGroupsSideOver = action.payload;
    },
    setShowWatchersSideOver: (state, action: PayloadAction<Watchers>) => {
      state.watchersSideOver = action.payload;
    },
    setShowCommentsSideOver: (state, action: PayloadAction<Comments>) => {
      state.commentsSideOver = action.payload;
    },
    setShowShareSideOver: (state, action: PayloadAction<Share>) => {
      state.shareSideOver = action.payload;
    },
    setShowPilotSideOver: (state, action: PayloadAction<Pilot>) => {
      state.pilotSideOver = action.payload;
    },
    setShowPilotSideOverHub: (state, action: PayloadAction<PilotHub>) => {
      state.pilotSideOverHub = action.payload;
    },
    setShowFilterByAssigneeSlideOver: (state, action: PayloadAction<boolean>) => {
      state.showFilterByAssigneeSlideOver = action.payload;
    }
  }
});

export const {
  setShowCreateDirectorySlideOver,
  setCreateInboxSlideOverVisibility,
  setCreateHubSlideOverVisibility,
  setEditHubSlideOverVisibility,
  setCreateWalletSlideOverVisibility,
  setCreateSubWalletSlideOverVisibility,
  setEditWalletSlideOverVisibility,
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
  setEditListSlideOverVisibility,
  setShowCommentsSideOver,
  setShowShareSideOver,
  setShowPilotSideOver,
  setShowPilotSideOverHub,
  setCreateSubHubSlideOverVisibility,
  setShowFilterByAssigneeSlideOver
} = slideOverSlice.actions;

export default slideOverSlice.reducer;
