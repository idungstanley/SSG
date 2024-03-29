import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logout, switchWorkspace } from '../../auth/authSlice';

interface teamMemberGroupState {
  teamMemberGroupsPaginationPage: number;
  selectedTeamMemberGroupId: string | null;
}

const initialState: teamMemberGroupState = {
  // Pagination
  teamMemberGroupsPaginationPage: 1,

  // General
  selectedTeamMemberGroupId: null
};

export const teamMemberGroupSlice = createSlice({
  name: 'teamMemberGroup',
  initialState,
  reducers: {
    goToPreviousTeamMemberGroupsPage: (state) => {
      state.teamMemberGroupsPaginationPage -= 1;
    },
    goToNextTeamMemberGroupsPage: (state) => {
      state.teamMemberGroupsPaginationPage += 1;
    },
    setTeamMemberGroupsPage: (state, action: PayloadAction<number>) => {
      state.teamMemberGroupsPaginationPage = action.payload;
    },
    setSelectedTeamMemberGroup: (state, action: PayloadAction<string>) => {
      state.selectedTeamMemberGroupId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(switchWorkspace, () => initialState).addCase(logout, () => initialState);
  }
});

// Action creators are generated for each case reducer function
export const {
  goToPreviousTeamMemberGroupsPage,
  goToNextTeamMemberGroupsPage,
  setTeamMemberGroupsPage,
  setSelectedTeamMemberGroup
} = teamMemberGroupSlice.actions;

export default teamMemberGroupSlice.reducer;
