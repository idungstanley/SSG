import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { taskStatusProps } from './statusManager.interface';

interface StatusManagerState {
  templateNames: string[];
}
const initialState: StatusManagerState = {
  templateNames: []
};
export const statusManagerSlice = createSlice({
  name: 'statusManager',
  initialState,
  reducers: {
    setTemplateNames(state, action: PayloadAction<taskStatusProps[]>) {
      state.templateNames = action.payload.map((item) => {
        return item.name;
      });
    }
  }
});

export const { setTemplateNames } = statusManagerSlice.actions;

export default statusManagerSlice.reducer;
