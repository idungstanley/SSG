import { createSlice } from '@reduxjs/toolkit';

interface TaskState {
  task: string[];
}

const initialState: TaskState = {
  task: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTaskSlice(state, action) {
      state.task.push(action.payload);
    },
    // timeEntries(state, action: PayloadAction<>) {},
    checkIfTask: (state) => state,
  },
});

export const { createTaskSlice, checkIfTask } = taskSlice.actions;
export default taskSlice.reducer;
