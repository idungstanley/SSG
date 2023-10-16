import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InsightsState {
  isShowGraphs: boolean;
  isShowFullMode: boolean;
  showedGraphs: string[];
  movingGraphId: string;
}

const initialState: InsightsState = {
  isShowGraphs: true,
  isShowFullMode: false,
  showedGraphs: [],
  movingGraphId: ''
};

export const insightsSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    setShowGraphs: (state, action: PayloadAction<boolean>) => {
      state.isShowGraphs = action.payload;
    },
    setShowFullMode: (state, action: PayloadAction<boolean>) => {
      state.isShowFullMode = action.payload;
    },
    setShowedGraphs: (state, action: PayloadAction<string[]>) => {
      state.showedGraphs = action.payload;
    },
    setMovingGraphId: (state, action: PayloadAction<string>) => {
      state.movingGraphId = action.payload;
    }
  }
});

export const { setShowGraphs, setShowFullMode, setShowedGraphs, setMovingGraphId } = insightsSlice.actions;

export default insightsSlice.reducer;
