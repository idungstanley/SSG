import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface walletProps {
  id: string;
  isOpen: boolean;
}
interface WalletState {
  wallet: walletProps[];
  currentWalletId: string | null;
  currentWalletType: string | null;
  parentWalletId: string | null;
  currentWalletName: string | null | undefined;
  archiveWallet: boolean;
  toggleArchiveWallet: boolean;
  paletteDropDown?: null | string;
  editWallet: boolean;
}

const initialState: WalletState = {
  wallet: [],
  currentWalletId: null,
  currentWalletType: null,
  parentWalletId: null,
  currentWalletName: null,
  archiveWallet: false,
  toggleArchiveWallet: false,
  paletteDropDown: null,
  editWallet: false
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    createWallet(state, action: PayloadAction<walletProps>) {
      state.wallet.push(action.payload);
    },
    getWallet(state, action: PayloadAction<walletProps[]>) {
      state.wallet = action.payload;
    },
    setArchiveWallet(state, action: PayloadAction<boolean>) {
      state.archiveWallet = action.payload;
    },
    setEditWallet(state, action: PayloadAction<boolean>) {
      state.editWallet = action.payload;
    },
    setToggleArchiveWallet(state, action: PayloadAction<boolean>) {
      state.toggleArchiveWallet = action.payload;
    },
    setPaletteDropDown(state, action: PayloadAction<string | null>) {
      state.paletteDropDown = action.payload;
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
    setCurrentWalletId(state, action: PayloadAction<string | null>) {
      state.currentWalletId = action.payload;
    },
    setCurrentWalletName(state, action: PayloadAction<string | null | undefined>) {
      state.currentWalletName = action.payload;
    },
    setParentWalletId(state, action: PayloadAction<string | null>) {
      state.parentWalletId = action.payload;
    },
    setCurrentWalletType(state, action: PayloadAction<string | null>) {
      state.currentWalletType = action.payload;
    },
    checkIfWallet: (state) => state
  }
});

export const {
  createWallet,
  checkIfWallet,
  getWallet,
  showWallet,
  setArchiveWallet,
  setToggleArchiveWallet,
  setPaletteDropDown,
  setEditWallet,
  setCurrentWalletId,
  setCurrentWalletType,
  setCurrentWalletName,
  setParentWalletId
} = walletSlice.actions;
export default walletSlice.reducer;
