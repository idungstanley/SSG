import { createSlice } from '@reduxjs/toolkit';
import { logout, switchWorkspace } from '../../auth/authSlice';

const initialState = {
  // Pagination
  teamMemberGroupsPaginationPage: 1,

  // General
  selectedTeamMemberGroupId: null,
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
    setTeamMemberGroupsPage: (state, action) => {
      state.teamMemberGroupsPaginationPage = action.payload;
    },
    setSelectedTeamMemberGroup: (state, action) => {
      state.selectedTeamMemberGroupId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(switchWorkspace, () => initialState)
      .addCase(logout, () => initialState);
  },
});

// Action creators are generated for each case reducer function
export const {
  goToPreviousTeamMemberGroupsPage,
  goToNextTeamMemberGroupsPage,
  setTeamMemberGroupsPage,
  setSelectedTeamMemberGroup,
} = teamMemberGroupSlice.actions;

export default teamMemberGroupSlice.reducer;
