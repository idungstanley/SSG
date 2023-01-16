import { createSlice } from '@reduxjs/toolkit';

interface WalletState {
  wallet: any[];
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
    showWallet(state, action) {
      state.wallet = state.wallet.map((wallet) => {
        if (wallet.id === action.payload) {
          return {
            ...wallet,
            isOpen: !wallet.isOpen,
          };
        }
        return wallet;
      });
    },
    setWalletId(state, action) {
      state.currentWalletId = action.payload;
    },
    checkIfWallet: (state) => state,
  },
});

export const { createWallet, checkIfWallet, getWallet, showWallet, setWalletId } =
  walletSlice.actions;
export default walletSlice.reducer;
