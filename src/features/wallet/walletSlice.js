import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wallet: [],
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    createWallet(state, action) {
      state.hub.push(action.payload);
    },
    checkIfWallet: (state) => state,
  },
});

export const { createWallet, checkIfWallet } = walletSlice.actions;
export default walletSlice.reducer;
