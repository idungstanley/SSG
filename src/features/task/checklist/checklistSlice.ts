import { createSlice, TaskAbortError } from "@reduxjs/toolkit";
import { stat } from "fs";
import { getOneTaskServices } from "../taskService";
import { getaTaskServices } from "./checklistService";

export interface ImyTaskData {
  //   id: string;
  name: string;
  taskId: any;
  //   description: string | null;
  //   list_id: string;
  //   parent_id: string | null;
  //   priority: string | null;
  //   start_date: string | null;
  //   end_date: string | null;
  //   assignees: string[];
  //   group_assignees: string[];
  //   updated_at: string;
  //   created_at: string;
  //   archived_at: string | null;
  //   deleted_at: string | null;
  //   directory_items: string[];
}

interface checklistState {
  checklist: any[];
  addnew: any;
  taskId: any;
}

const initialState: checklistState = {
  checklist: [],
  addnew: null,
  taskId: null,
};

export const checklistSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // createchecklistSlice(state, action) {
    //   // state.checklist.push(action.payload);
    //   console.log(state.checklist);
    // },
    checkLists(state, { payload }) {
      const { data: task } = getOneTaskServices({ task_id: payload });
      const singleTask = task?.data.task;
      const task_checklists = singleTask?.task_checklists;
      state.checklist = task_checklists;
    },
    getchecklist(state, { payload }) {
      state.checklist = payload;
    },
    updateList(state, action) {
      state.checklist.push(action.payload);
    },
    getTaskId(state, action) {
      state.taskId = action.payload;
    },
  },
});

export const { getchecklist, updateList, getTaskId, checkLists } =
  checklistSlice.actions;

export default checklistSlice.reducer;
