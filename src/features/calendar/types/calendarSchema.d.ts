import { DayOff } from './daysOff';

export interface CalendarState {
  updateCords: number; // random number
  blacklistIds: BlacklistId[]; //  member ids do not need to be shown
  newDayOff: NewDayOff | null;
}

interface NewDayOff extends Pick<DayOff, 'start_date' | 'end_date'> {
  userId: string;
}

export type BlacklistId = string;
