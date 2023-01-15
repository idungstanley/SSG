import { createSlice } from '@reduxjs/toolkit';

interface WalletState {
  wallet: string[];
  currentWalletId: null;
}

const initialState: WalletState = {
  wallet: [],
  currentWalletId: null,
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
    setWalletId(state, action) {
      state.currentWalletId = action.payload;
    },
    checkIfWallet: (state) => state,
  },
});

export const { createWallet, checkIfWallet, getWallet, setWalletId } =
  walletSlice.actions;
export default walletSlice.reducer;
