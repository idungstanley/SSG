import { createSlice } from '@reduxjs/toolkit';

export const teamMemberInviteSlice = createSlice({
  name: 'teamMemberInvite',
  initialState: {
    // Pagination
    teamMemberInvitesPaginationPage: 1,
  },
  reducers: {
    goToPreviousTeamMemberInvitesPage: (state) => {
      state.teamMemberInvitesPaginationPage -= 1;
    },
    goToNextTeamMemberInvitesPage: (state) => {
      state.teamMemberInvitesPaginationPage += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  goToPreviousTeamMemberInvitesPage,
  goToNextTeamMemberInvitesPage,
} = teamMemberInviteSlice.actions;

export default teamMemberInviteSlice.reducer;
