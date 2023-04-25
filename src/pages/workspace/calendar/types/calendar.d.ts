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
  type: LeaveType;
  reason: string;
  user: User;
}

export interface onCreateDayOffProps {
  type: LeaveType;
  reason: string;
  start: string;
  end: string;
  memberId: string;
}

interface LeaveType {
  id: string;
  title: string;
  color: string;
  icon: JSX.Element;
}

export interface DaysOffContextValue {
  daysOff: DayOff[];
  onCreateDayOff: ({ type, reason, start, end, memberId }: onCreateDayOffProps) => void;
  showCreateDayOffModal: boolean;
  setShowCreateDayOffModal: (i: boolean) => void;
  activeMemberId: string;
  setActiveMemberId: (i: string) => void;
  newDayOff: { start: Dayjs; end: Dayjs } | null;
  setNewDayOff: (i: { start: Dayjs; end: Dayjs } | null) => void;
  leaveTypes: LeaveType[];
  onAddLeaveType: (i: LeaveType) => void;
}
