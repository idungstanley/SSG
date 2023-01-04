import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  showChat: true,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setShowChat: (state, action: PayloadAction<boolean>) => {
      state.showChat = action.payload;
    },
  },
});

export const { setShowChat } = chatSlice.actions;

export default chatSlice.reducer;
