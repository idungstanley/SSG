import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InsightsState {
  isShowGraphs: boolean;
  isShowFullMode: boolean;
  showedGraph: string;
  movingGraphId: string;
  isUpdatePosition: boolean;
}

const initialState: InsightsState = {
  isShowGraphs: true,
  isShowFullMode: false,
  showedGraph: '',
  movingGraphId: '',
  isUpdatePosition: false
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
    setShowedGraph: (state, action: PayloadAction<string>) => {
      state.showedGraph = action.payload;
    },
    setMovingGraphId: (state, action: PayloadAction<string>) => {
      state.movingGraphId = action.payload;
    },
    setUpdatePosition: (state, action: PayloadAction<boolean>) => {
      state.isUpdatePosition = action.payload;
    }
  }
});

export const { setShowGraphs, setShowFullMode, setShowedGraph, setMovingGraphId, setUpdatePosition } =
  insightsSlice.actions;

export default insightsSlice.reducer;
