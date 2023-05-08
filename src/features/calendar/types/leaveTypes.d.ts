export interface LeaveType {
  id: string;
  name: string;
  color: string;
  icon: string;
  is_deducted: 0 | 1;
  is_require_approval: 0 | 1;
  is_include_max_off: 0 | 1;
  updated_at: string;
  created_at: string;
}

export interface LeaveTypesRes {
  data: {
    leave_types: LeaveType[];
  };
}

export type AddLeaveTypeProps = Omit<LeaveType, 'updated_at' | 'created_at' | 'id'>;
