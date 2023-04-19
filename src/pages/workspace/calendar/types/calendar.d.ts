import { Dayjs } from 'dayjs';

export interface MonthObject {
  name: string;
  month: Dayjs;
  days: Dayjs[];
}

export interface Event {
  id: string;
  user: User;
  daysOff: DayOff[];
}

export interface User {
  name: string;
}

export interface DayOff {
  id: string;
  start: string;
  end: string;
  type: string;
  reason: string;
}
