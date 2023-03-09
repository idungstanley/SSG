import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../../app/store';

interface IOption {
  label: string;
  style: string;
  callback: () => void;
}

interface PromptState {
  show: boolean;
  title: string;
  body: string;
  options: IOption[];
}

const initialState: PromptState = {
  show: false,
  title: '',
  body: '',
  options: []
};

export const promptSlice = createSlice({
  name: 'prompt',
  initialState,
  reducers: {
    setVisibility: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
    setData: (state, action: PayloadAction<{ title: string; body: string }>) => {
      state.title = action.payload.title;
      state.body = action.payload.body;
    },
    setOptions: (state, action: PayloadAction<IOption[]>) => {
      state.options = action.payload;
    },
    reset: (state) => {
      state.show = false;
      state.title = '';
      state.body = '';
      state.options = [];
    }
  }
});

export const { setVisibility, setData, setOptions, reset } = promptSlice.actions;

export const displayPrompt = (title: string, body: string, options: IOption[]) => (dispatch: AppDispatch) => {
  dispatch(
    setData({
      title,
      body
    })
  );
  dispatch(setOptions(options));
  dispatch(setVisibility(true));
};

export default promptSlice.reducer;
