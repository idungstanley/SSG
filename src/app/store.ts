import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "../features/auth/authSlice";
import wsSlice from "../features/workspace/workspaceSlice";
import hubSlice from "../features/hubs/hubSlice";
import walletSlice from "../features/wallet/walletSlice";
import listSlice from "../features/list/listSlice";
import taskSlice from "../features/task/taskSlice";
import explorerSlice from "../features/explorer/explorerSlice";
import inboxSlice from "../features/inbox/inboxSlice";
import searchSlice from "../features/search/searchSlice";
import notificationSlice from "../features/general/notification/notificationSlice";
import slideOverSlice from "../features/general/slideOver/slideOverSlice";
import promptSlice from "../features/general/prompt/promptSlice";
import teamMemberSlice from "../features/settings/teamMembers/teamMemberSlice";
import teamMemberInviteSlice from "../features/settings/teamMemberInvites/teamMemberInviteSlice";
import teamMemberGroupSlice from "../features/settings/teamMemberGroups/teamMemberGroupSlice";
import sharedSlice from "../features/shared/sharedSlice";
import uploadFileSlice from "../features/general/uploadFile/uploadFileSlice";
import chatSlice from "../features/chat/chatSlice";
import accountSlice from "../features/account/accountSlice";
import checklistSlice from "../features/task/checklist/checklistSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    notification: notificationSlice,
    slideOver: slideOverSlice,
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
    wallet: walletSlice,
    list: listSlice,
    task: taskSlice,
    upload: uploadFileSlice,
    chat: chatSlice,
    account: accountSlice,
    checklist: checklistSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
