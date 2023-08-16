import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { BlacklistId, CalendarState, NewDayOff } from '../types/calendarSchema';

const initialState: CalendarState = {
  updateCords: Date.now(),
  blacklistIds: [],
  newDayOff: null,
  intervalType: 'minutes',
  timeInterval: 15,
  reminderType: 'days',
  reminderInterval: 2
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
  setRemindertype
} = calendarSlice.actions;

export default calendarSlice.reducer;
