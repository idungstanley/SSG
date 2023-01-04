import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  showChat: false,
  showMembersInChatSideOver: false,
  showCreateChatSideOver: false,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setShowChat: (state, action: PayloadAction<boolean>) => {
      state.showChat = action.payload;
    },
    setShowMembersInChatSideOver: (state, action: PayloadAction<boolean>) => {
      state.showMembersInChatSideOver = action.payload;
    },
    setShowCreateChatSideOver: (state, action: PayloadAction<boolean>) => {
      state.showCreateChatSideOver = action.payload;
    },
  },
});

export const {
  setShowChat,
  setShowMembersInChatSideOver,
  setShowCreateChatSideOver,
} = chatSlice.actions;

export default chatSlice.reducer;
