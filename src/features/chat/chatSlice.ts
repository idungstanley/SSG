import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { itemType } from '../../types';
import { IMessage } from './chat.interfaces';
import { UploadedUppyFile } from '@uppy/core';

interface ISelectedItem {
  id: string;
  type: itemType;
}

interface ChatState {
  showChat: boolean;
  showMembersInChatSideOver: boolean;
  selectedItem: ISelectedItem | null;
  activeChat: string;
  selectedMessage: IMessage | null;
  showFileAttachModal: boolean;
  chatAttachmentsFiles: UploadedUppyFile<Record<string, unknown>, Record<string, unknown>>[];
}

const initialState: ChatState = {
  showChat: false,
  showMembersInChatSideOver: false,
  selectedItem: null,
  activeChat: '',
  selectedMessage: null,
  showFileAttachModal: false,
  chatAttachmentsFiles: []
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
    setSelectedItem: (state, action: PayloadAction<ISelectedItem | null>) => {
      state.selectedItem = action.payload;
      state.showChat = !!state.selectedItem;
    },
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChat = action.payload;
    },
    setSelectedMessage: (state, action: PayloadAction<IMessage | null>) => {
      state.selectedMessage = action.payload;
    },
    setShowFileAttachModal(state, action: PayloadAction<boolean>) {
      state.showFileAttachModal = action.payload;
    },
    setChatAttachmentsFiles(
      state,
      action: PayloadAction<UploadedUppyFile<Record<string, unknown>, Record<string, unknown>>[]>
    ) {
      state.chatAttachmentsFiles = action.payload;
    }
  }
});

export const {
  setShowChat,
  setShowMembersInChatSideOver,
  setSelectedItem,
  setActiveChat,
  setSelectedMessage,
  setShowFileAttachModal,
  setChatAttachmentsFiles
} = chatSlice.actions;

export default chatSlice.reducer;
