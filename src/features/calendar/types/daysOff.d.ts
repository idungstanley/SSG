import { LeaveType } from './leaveTypes';

interface TeamMemberWithDayOffs {
  team_member: TeamMember;
  day_offs: DayOff[];
}

interface DayOff {
  id: string;
  leave_type: LeaveType;
  start_date: string;
  end_date: string;
  reason: string | null;
  is_approved: 0 | 1;
  updated_at: string;
  created_at: string;
}

interface TeamMember {
  id: string;
  user: {
    id: string;
    name: string;
    initials: string;
    color: string;
    timezone: string;
    email: string;
    avatar_path: string | null;
  };
  role: {
    key: string;
    name: string;
  };
  color: string;
  created_at: string;
  updated_at: string;
}

export interface DaysOffRes {
  data: {
    list: TeamMemberWithDayOffs[];
  };
}

export interface AddDayOffProps {
  hub_id: Pick<IHub, 'id'>['id'];
  team_member_id: Pick<TeamMember, 'id'>['id'];
  leave_type_id: Pick<LeaveType, 'id'>['id'];
  start_date: string;
  end_date: string;
  reason?: string;
}

interface UnapprovedDayOff extends DayOff {
  team_member: TeamMember;
}

export interface UnapprovedDaysOffRes {
  data: {
    requests: UnapprovedDayOff[];
  };
}
