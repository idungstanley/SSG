import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { BlacklistId, CalendarState, NewDayOff } from '../types/calendarSchema';

const initialState: CalendarState = {
  updateCords: Date.now(),
  blacklistIds: [],
  newDayOff: null
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
    }
  }
});

export const selectCalendar = (state: RootState) => state.calendar;

export const { setUpdateCords, setBlacklistIds, setNewDayOff } = calendarSlice.actions;

export default calendarSlice.reducer;
