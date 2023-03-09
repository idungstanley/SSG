import { createSlice } from '@reduxjs/toolkit';
import { logout, switchWorkspace } from '../../auth/authSlice';

const initialState = {
  // Pagination
  teamMemberInvitesPaginationPage: 1
};

export const teamMemberInviteSlice = createSlice({
  name: 'teamMemberInvite',
  initialState,
  reducers: {
    goToPreviousTeamMemberInvitesPage: (state) => {
      state.teamMemberInvitesPaginationPage -= 1;
    },
    goToNextTeamMemberInvitesPage: (state) => {
      state.teamMemberInvitesPaginationPage += 1;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(switchWorkspace, () => initialState).addCase(logout, () => initialState);
  }
});

// Action creators are generated for each case reducer function
export const { goToPreviousTeamMemberInvitesPage, goToNextTeamMemberInvitesPage } = teamMemberInviteSlice.actions;

export default teamMemberInviteSlice.reducer;
