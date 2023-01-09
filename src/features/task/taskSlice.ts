import { createSlice } from '@reduxjs/toolkit';

interface TaskState {
  task: string[];
  watchersData: string[];
  removeWatcherId: null;
  currTeamMemberId: null;
}

const initialState: TaskState = {
  task: [],
  watchersData: [],
  currTeamMemberId: null,
  removeWatcherId: null,
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
    setRmWatcher(state, action) {
      state.removeWatcherId = action.payload;
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
  setRmWatcher,
} = taskSlice.actions;
export default taskSlice.reducer;
