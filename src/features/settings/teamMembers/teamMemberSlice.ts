import { createSlice } from '@reduxjs/toolkit';
import { logout, switchWorkspace } from '../../auth/authSlice';

const initialState = {
  // Search
  teamMembersSearchQuery: '',

  // Pagination
  teamMembersPaginationPage: 1,
};

export const teamMemberSlice = createSlice({
  name: 'teamMember',
  initialState,
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
  extraReducers: (builder) => {
    builder
      .addCase(switchWorkspace, () => initialState)
      .addCase(logout, () => initialState);
  },
});

// Action creators are generated for each case reducer function
export const {
  setTeamMembersSearchQuery,
  goToPreviousTeamMembersPage,
  goToNextTeamMembersPage,
} = teamMemberSlice.actions;

export default teamMemberSlice.reducer;
