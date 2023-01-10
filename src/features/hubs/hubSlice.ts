import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HubState {
  hub: string[];
  currHubId: null;
  delHub: boolean;
  showSubItems: boolean;
}

const initialState: HubState = {
  hub: [],
  currHubId: null,
  delHub: false,
  showSubItems: false,
};

export const hubSlice = createSlice({
  name: 'hub',
  initialState,
  reducers: {
    createHub(state, action) {
      state.hub.push(action.payload);
    },
    getHub(state, action) {
      state.hub = action.payload;
    },
    setDelHub(state, action) {
      state.delHub = action.payload;
    },
    getCurrHubId(state, action) {
      state.currHubId = action.payload;
    },
    setShowSubItems(state, action) {
      state.showSubItems = action.payload;
    },
    chechIfHub: (state) => state,
  },
});

export const {
  createHub,
  getHub,
  chechIfHub,
  getCurrHubId,
  setDelHub,
  setShowSubItems,
} = hubSlice.actions;
export default hubSlice.reducer;
