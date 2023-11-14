import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { itemType } from '../../types';
import { IMessage } from './chat.interfaces';

interface ISelectedItem {
  id: string;
  type: itemType;
}

interface ChatState {
  showChat: boolean;
  showMembersInChatSideOver: boolean;
  showCreateChatSideOver: boolean;
  selectedItem: ISelectedItem | null;
  activeChat: string;
  selectedMessage: IMessage | null;
}

const initialState: ChatState = {
  showChat: false,
  showMembersInChatSideOver: false,
  showCreateChatSideOver: false,
  selectedItem: null,
  activeChat: '',
  selectedMessage: null
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
    setSelectedItem: (state, action: PayloadAction<ISelectedItem | null>) => {
      state.selectedItem = action.payload;
      state.showChat = !!state.selectedItem;
    },
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChat = action.payload;
    },
    setSelectedMessage: (state, action: PayloadAction<IMessage | null>) => {
      state.selectedMessage = action.payload;
    }
  }
});

export const {
  setShowChat,
  setShowMembersInChatSideOver,
  setShowCreateChatSideOver,
  setSelectedItem,
  setActiveChat,
  setSelectedMessage
} = chatSlice.actions;

export default chatSlice.reducer;
