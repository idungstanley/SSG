import { Dayjs } from 'dayjs';

export interface MonthObject {
  name: string;
  month: Dayjs;
  days: Dayjs[];
}

export interface Member {
  id: string;
  user: User;
  daysOff: DayOff[];
}

export interface User {
  id: string;
}

export interface DayOff {
  id: string;
  start: string;
  end: string;
  type: string;
  reason: string;
  user: User;
}

export interface onCreateDayOffProps {
  type: { id: number; title: string };
  reason: string;
  start: string;
  end: string;
}

export interface DaysOffContextValue {
  daysOff: DayOff[];
  onCreateDayOff: ({ type, reason, start, end, userId }: onCreateDayOffProps) => void;
  showCreateDayOffModal: boolean;
  setShowCreateDayOffModal: (i: boolean) => void;
  activeMemberId: string;
  setActiveMemberId: (i: string) => void;
  newDayOff: { start: Dayjs; end: Dayjs } | null;
  setNewDayOff: (i: { start: Dayjs; end: Dayjs } | null) => void;
}
