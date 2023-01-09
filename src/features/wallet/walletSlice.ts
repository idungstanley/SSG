import { createSlice } from '@reduxjs/toolkit';

interface WalletState {
  wallet: string[]
}

const initialState: WalletState = {
  wallet: [],
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    createWallet(state, action) {
      state.wallet.push(action.payload);
    },
    getWallet(state, action) {
      state.wallet = action.payload;
    },
    checkIfWallet: (state) => state,
  },
});

export const { createWallet, checkIfWallet, getWallet } = walletSlice.actions;
export default walletSlice.reducer;
