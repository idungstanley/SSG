import { createSlice } from '@reduxjs/toolkit';

export const promptSlice = createSlice({
  name: 'prompt',
  initialState: {
    show: false,
    title: '',
    body: '',
    options: [],
    /*
    options: [
      {
        label: 'Stop',
        style: 'danger',
        callback: () => {
          alert('stop');
        },
      },
      {
        label: 'Replace',
        style: 'plain',
        callback: () => {
          alert('replace');
        },
      },
    ],
    */
  },
  reducers: {
    setVisibility: (state, action) => {
      state.show = action.payload;
    },
    setData: (state, action) => {
      state.title = action.payload.title;
      state.body = action.payload.body;
    },
    setOptions: (state, action) => {
      state.options = action.payload;
    },
    reset: (state) => {
      state.show = false;
      state.title = '';
      state.body = '';
      state.options = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setVisibility,
  setData,
  setOptions,
  reset,
} = promptSlice.actions;

export const displayPrompt = (title, body, options) => (dispatch) => {
  dispatch(setData({
    title,
    body,
  }));
  dispatch(setOptions(options));
  dispatch(setVisibility(true));
};

export default promptSlice.reducer;
