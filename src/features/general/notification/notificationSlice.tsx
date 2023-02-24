import { createSlice } from '@reduxjs/toolkit';

interface NotificationStore {
  show: boolean;
  duration: number | null;
  type: 'success' | 'error';
  title: string;
  body: string;
  center: boolean;
  top: boolean;
  show_close: boolean;
}

const initialState: NotificationStore = {
  show: false,
  duration: null,
  type: 'success',
  title: '-',
  body: '-',
  center: false,
  top: true,
  show_close: true,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setVisibility: (state, action) => {
      state.show = action.payload.show;
      state.duration = action.payload.duration;
    },
    setContent: (state, action) => {
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.body = action.payload.body;
      state.center = action.payload.center;
      state.top = action.payload.top;
      state.show_close = action.payload.show_close;
    }
  },
});

export const { setVisibility, setContent } =
  notificationSlice.actions;

export default notificationSlice.reducer;
