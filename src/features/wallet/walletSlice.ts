import { createSlice } from '@reduxjs/toolkit';

interface walletProps {
  id: string;
  isOpen: boolean;
}
interface WalletState {
  wallet: walletProps[];
  currentWalletParentId: null;
  currentWalletParentType: null;
  delWallet: boolean;
  archiveWallet: boolean;
  toggleArchiveWallet: boolean;
}

const initialState: WalletState = {
  wallet: [],
  currentWalletParentId: null,
  currentWalletParentType: null,
  delWallet: false,
  archiveWallet: false,
  toggleArchiveWallet: false
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
    setArchiveWallet(state, action) {
      state.archiveWallet = action.payload;
    },
    setToggleArchiveWallet(state, action) {
      state.toggleArchiveWallet = action.payload;
    },
    setDeleteWallet(state, action) {
      state.delWallet = action.payload;
    },
    showWallet(state, action) {
      state.wallet = state.wallet.map((wallet) => {
        if (wallet.id === action.payload) {
          return {
            ...wallet,
            isOpen: !wallet.isOpen
          };
        }
        return wallet;
      });
    },
    setWalletItem(state, action) {
      state.currentWalletParentId = action.payload.currentWalletParentId;
      state.currentWalletParentType = action.payload.currentWalletParentType;
    },
    checkIfWallet: (state) => state
  }
});

export const {
  createWallet,
  checkIfWallet,
  getWallet,
  showWallet,
  setWalletItem,
  setDeleteWallet,
  setArchiveWallet,
  setToggleArchiveWallet
} = walletSlice.actions;
export default walletSlice.reducer;
