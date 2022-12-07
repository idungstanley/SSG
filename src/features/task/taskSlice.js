import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  task: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTask(state, action) {
      state.task.push(action.payload);
    },
    checkIfTask: (state) => state,
  },
});

export const { createTask, checkIfTask } = taskSlice.actions;
export default taskSlice.reducer;
