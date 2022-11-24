import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from '../features/auth/authSlice';
import wsSlice from '../features/workspace/workspaceSlice';
import hubSlice from '../features/hubs/hubSlice';
import explorerSlice from '../features/explorer/explorerSlice';
import inboxSlice from '../features/inbox/inboxSlice';
import searchSlice from '../features/search/searchSlice';
import notificationSlice from '../features/general/notification/notificationSlice';
import slideOverSlice from '../features/general/slideOver/slideOverSlice';
import contextMenuSlice from '../features/general/contextMenu/contextMenuSlice';
import promptSlice from '../features/general/prompt/promptSlice';
import teamMemberSlice from '../features/settings/teamMembers/teamMemberSlice';
import teamMemberInviteSlice from '../features/settings/teamMemberInvites/teamMemberInviteSlice';
import teamMemberGroupSlice from '../features/settings/teamMemberGroups/teamMemberGroupSlice';
import sharedSlice from '../features/shared/sharedSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    notification: notificationSlice,
    slideOver: slideOverSlice,
    contextMenu: contextMenuSlice,
    prompt: promptSlice,
    explorer: explorerSlice,
    inbox: inboxSlice,
    search: searchSlice,
    teamMember: teamMemberSlice,
    teamMemberInvite: teamMemberInviteSlice,
    teamMemberGroup: teamMemberGroupSlice,
    shared: sharedSlice,
    workspace: wsSlice,
    hub: hubSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

setupListeners(store.dispatch);
