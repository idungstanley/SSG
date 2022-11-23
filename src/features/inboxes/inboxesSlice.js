import { createSlice } from '@reduxjs/toolkit';

const showHiddenLS = JSON.parse(localStorage.getItem('showHidden'));

const initialState = {
  showHidden: showHiddenLS,
};

export const inboxesSlice = createSlice({
  name: 'inboxes',
  initialState,
  reducers: {
    setShowHidden: (state, action) => {
      state.showHidden = action.payload;

      localStorage.setItem('showHidden', JSON.stringify(action.payload));
    },
  },
});

export const { setShowHidden } = inboxesSlice.actions;

export default inboxesSlice.reducer;
