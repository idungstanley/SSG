import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import {
  BlacklistId,
  CalendarState,
  HrOpenedEntities,
  HrTeamMembers,
  NewDayOff,
  SavedSelections,
  SelectedHubs
} from '../types/calendarSchema';

const initialState: CalendarState = {
  updateCords: Date.now(),
  blacklistIds: [],
  newDayOff: null,
  intervalType: 'minutes',
  timeInterval: 15,
  reminderType: 'days',
  reminderInterval: 2,
  selectedHubs: [],
  savedSelections: [],
  hrOpenedEntities: [],
  hrTeamMembers: []
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setUpdateCords: (state) => {
      state.updateCords = Date.now();
    },
    setBlacklistIds: (state, action: PayloadAction<BlacklistId[]>) => {
      state.blacklistIds = action.payload;
    },
    setNewDayOff: (state, action: PayloadAction<NewDayOff | null>) => {
      state.newDayOff = action.payload;
    },
    setIntervalType(state, action: PayloadAction<string>) {
      state.intervalType = action.payload;
    },
    setTimeInterval(state, action: PayloadAction<number | string>) {
      state.timeInterval = action.payload;
    },
    setReminderInterval(state, action: PayloadAction<number | string>) {
      state.reminderInterval = action.payload;
    },
    setRemindertype(state, action: PayloadAction<string | number>) {
      state.reminderType = action.payload;
    },
    setSelectedHubs(state, action: PayloadAction<SelectedHubs[]>) {
      state.selectedHubs = action.payload;
    },
    setSavedSelections(state, action: PayloadAction<SavedSelections[]>) {
      state.savedSelections = action.payload;
    },
    setHrOpenedEntities: (state, action: PayloadAction<HrOpenedEntities[]>) => {
      state.hrOpenedEntities = action.payload;
    },
    setHrTeamMembers(state, action: PayloadAction<HrTeamMembers[]>) {
      state.hrTeamMembers = action.payload;
    }
  }
});

export const selectCalendar = (state: RootState) => state.calendar;

export const {
  setUpdateCords,
  setBlacklistIds,
  setNewDayOff,
  setIntervalType,
  setTimeInterval,
  setReminderInterval,
  setRemindertype,
  setSelectedHubs,
  setSavedSelections,
  setHrOpenedEntities,
  setHrTeamMembers
} = calendarSlice.actions;

export default calendarSlice.reducer;
