import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    show: false,
    duration: null,
    type: 'success',
    title: '-',
    body: '-',
    center: false,
    top: true,
    show_close: true,
  },
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
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setVisibility,
  setContent,
} = notificationSlice.actions;

export const displayNotification = (type, title, body, duration = 5000, center = false, top = true, show_close = true) => async (dispatch) => {
  dispatch(setContent({
    type,
    title,
    body,
    center,
    top,
    show_close,
  }));
  dispatch(setVisibility({
    show: true,
    duration,
  }));
};

export default notificationSlice.reducer;
