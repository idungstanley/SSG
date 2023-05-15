import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

interface CalendarState {
  updateCords: number; // random number
}

const initialState: CalendarState = {
  updateCords: Date.now()
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setUpdateCords: (state) => {
      state.updateCords = Date.now();
    }
  }
});

export const selectCalendar = (state: RootState) => state.calendar;

export const { setUpdateCords } = calendarSlice.actions;

export default calendarSlice.reducer;
