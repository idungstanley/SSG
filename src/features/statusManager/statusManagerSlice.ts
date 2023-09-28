import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { taskStatusProps } from './statusManager.interface';

interface StatusManagerState {
  templateNames: string[];
  templateCollections: taskStatusProps[];
}
const initialState: StatusManagerState = {
  templateNames: [],
  templateCollections: []
};
export const statusManagerSlice = createSlice({
  name: 'statusManager',
  initialState,
  reducers: {
    setTemplateNames(state, action: PayloadAction<taskStatusProps[]>) {
      state.templateNames = action.payload.map((item) => {
        return item.name;
      });
      state.templateCollections = action.payload;
    }
  }
});

export const { setTemplateNames } = statusManagerSlice.actions;

export default statusManagerSlice.reducer;
