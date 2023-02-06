import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import { getOneTaskServices } from "../taskService";
import { getaTaskServices } from "./checklistService";

export interface ImyTaskData {
  //   id: string;
  name: string;
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
}

const initialState: checklistState = {
  checklist: [
    {
      name: "Checklist",
    },
    {
      name: "Checklist",
    },
    {
      name: "Checklist",
    },
  ],
};

export const checklistSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // createchecklistSlice(state, action) {
    //   // state.checklist.push(action.payload);
    //   console.log(state.checklist);
    // },
    getchecklist(state, { payload }) {
      state.checklist = payload;
    },
    updateList(state, action) {
      state.checklist.push(action.payload);
    },
  },
});

export const { getchecklist, updateList } = checklistSlice.actions;

export default checklistSlice.reducer;
