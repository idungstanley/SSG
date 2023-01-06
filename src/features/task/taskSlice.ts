import { createSlice } from '@reduxjs/toolkit';

interface TaskState {
  task: string[];
  watchersData: string[];

  currTeamMemberId: null;
}

const initialState: TaskState = {
  task: [],
  watchersData: [],
  currTeamMemberId: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTaskSlice(state, action) {
      state.task.push(action.payload);
    },
    setWatchersData(state, action) {
      state.watchersData.push(action.payload);
    },

    setCurrTeamMemId(state, action) {
      state.currTeamMemberId = action.payload;
    },
    checkIfTask: (state) => state,
  },
});

export const {
  createTaskSlice,
  checkIfTask,
  setWatchersData,
  setCurrTeamMemId,
} = taskSlice.actions;
export default taskSlice.reducer;
