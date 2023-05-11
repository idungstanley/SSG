import { DayOff } from '../types/calendar';

export const filterDaysOff = (daysOff: DayOff[], action: 'approved' | 'disapproved') =>
  daysOff.filter((i) => (action === 'approved' ? i.isApproved : !i.isApproved));
