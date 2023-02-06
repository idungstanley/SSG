import { createSlice } from "@reduxjs/toolkit";
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
  checklist: [],
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
    updateChecklist(stat, { payload }) {
      console.log("Payload na=" + " " + payload);
    },
  },
});

export const { getchecklist, updateChecklist } = checklistSlice.actions;

export const selectChecklists = (initialState) => initialState.checklist;

export default checklistSlice.reducer;
