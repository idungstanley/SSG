import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface walletProps {
  id: string;
  isOpen: boolean;
}
interface WalletState {
  wallet: walletProps[];
  archiveWallet: boolean;
  toggleArchiveWallet: boolean;
  paletteDropDown?: null | string;
  editWallet: boolean;
}

const initialState: WalletState = {
  wallet: [],
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
  setEditWallet
} = walletSlice.actions;
export default walletSlice.reducer;
