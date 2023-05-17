import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { BlacklistId, CalendarState } from '../types/calendarSchema';

const initialState: CalendarState = {
  updateCords: Date.now(),
  blacklistIds: []
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
    }
  }
});

export const selectCalendar = (state: RootState) => state.calendar;

export const { setUpdateCords, setBlacklistIds } = calendarSlice.actions;

export default calendarSlice.reducer;
