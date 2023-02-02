import { createSlice } from "@reduxjs/toolkit";

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
  ],
};

export const checklistSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    createchecklistSlice(state, action) {
      state.checklist.push(action.payload);
    },
    // getchecklist(state, { payload }) {
    //   state.checklist.push(payload);
    // },
  },
});

export const { createchecklistSlice } = checklistSlice.actions;
export default checklistSlice.reducer;
