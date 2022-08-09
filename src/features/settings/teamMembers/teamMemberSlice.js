import { createSlice } from '@reduxjs/toolkit';

export const teamMemberSlice = createSlice({
  name: 'teamMember',
  initialState: {
    // Search
    teamMembersSearchQuery: '',

    // Pagination
    teamMembersPaginationPage: 1,
  },
  reducers: {
    setTeamMembersSearchQuery: (state, action) => {
      state.teamMembersPaginationPage = 1;
      state.teamMembersSearchQuery = action.payload;
    },
    goToPreviousTeamMembersPage: (state) => {
      state.teamMembersPaginationPage -= 1;
    },
    goToNextTeamMembersPage: (state) => {
      state.teamMembersPaginationPage += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setTeamMembersSearchQuery,
  goToPreviousTeamMembersPage,
  goToNextTeamMembersPage,
} = teamMemberSlice.actions;

export default teamMemberSlice.reducer;
