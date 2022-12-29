import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  showUploadModal: false,
};

export const uploadFileSlice = createSlice({
  name: 'uploadFile',
  initialState,
  reducers: {
    setShowUploadModal: (state, action: PayloadAction<boolean>) => {
      state.showUploadModal = action.payload;
    },
  },
});

export const { setShowUploadModal } = uploadFileSlice.actions;

export default uploadFileSlice.reducer;
