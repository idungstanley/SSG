import { createSlice } from "@reduxjs/toolkit";

export interface ImyTaskData {
  id: string;
  name: string;
  description: string | null;
  list_id: string;
  parent_id: string | null;
  priority: string | null;
  start_date: string | null;
  end_date: string | null;
  assignees: string[];
  group_assignees: string[];
  updated_at: string;
  created_at: string;
  archived_at: string | null;
  deleted_at: string | null;
  directory_items: string[];
}

interface TaskState {
  task: string[];
  watchersData: string[];
  removeWatcherId: null;
  currTeamMemberId: null;
  myTaskData: ImyTaskData[];
}

const initialState: TaskState = {
  task: [],
  watchersData: [],
  currTeamMemberId: null,
  removeWatcherId: null,
  myTaskData: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    createTaskSlice(state, action) {
      state.task.push(action.payload);
    },
    getTaskData(state, action) {
      const myObj = {
        id: "ewt22222",
        name: "",
      };
      const taskDataArray = action.payload;
      // taskDataArray.unshift(myObj);
      state.myTaskData = taskDataArray;
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
  getTaskData,
  setRmWatcher,
} = taskSlice.actions;
export default taskSlice.reducer;
