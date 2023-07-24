import { createSlice } from '@reduxjs/toolkit';
import { logout, switchWorkspace } from '../../auth/authSlice';
import { SortOption } from '../../../pages/workspace/tasks/component/views/listLevel/component/TaskListPropertyHead';

const defaultSortOptions: SortOption[] = [];
const sortInviteArr: string[] = [];

const initialState = {
  // Pagination
  teamMemberInvitesPaginationPage: 1,
  triggerGetTeammeberInvite: false,
  sortTeamInviteArr: defaultSortOptions,
  sortInvite: sortInviteArr
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
    },
    SetTriggerGetTeammeberInvite: (state, action) => {
      state.triggerGetTeammeberInvite = action.payload;
    },
    setSortTeamInviteArr: (state, action) => {
      const newArr = [...state.sortTeamInviteArr, action.payload];
      state.sortTeamInviteArr = newArr;
    },
    setSortInvite: (state, action) => {
      state.sortInvite = action.payload;
    },
    setRemoveSortTeamInvite: (state, action) => {
      const newArr = state.sortTeamInviteArr.filter((item) => item.field !== action.payload);
      state.sortTeamInviteArr = newArr;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(switchWorkspace, () => initialState).addCase(logout, () => initialState);
  }
});

// Action creators are generated for each case reducer function
export const {
  goToPreviousTeamMemberInvitesPage,
  goToNextTeamMemberInvitesPage,
  SetTriggerGetTeammeberInvite,
  setSortTeamInviteArr,
  setSortInvite,
  setRemoveSortTeamInvite
} = teamMemberInviteSlice.actions;

export default teamMemberInviteSlice.reducer;
