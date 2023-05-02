import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';
import { useDaysOff } from '../lib/daysOffContext';
import { filterDaysOff } from '../lib/filterDaysOff';
import { getUser } from '../lib/userUtils';
import DisapprovedDayOffCard from './DisapprovedDayOffCard';

export default function DisapprovedDaysOffList() {
  const { daysOff, manageStatus } = useDaysOff();
  const { data } = useGetTeamMembers({ page: 1, query: '' });
  const members = data?.data.team_members ?? [];

  const disapprovedDaysOff = filterDaysOff(daysOff, 'disapproved');

  return (
    <ul role="list" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {disapprovedDaysOff.map((dayOff) => {
        const user = getUser(members, dayOff.user.id);

        return user ? (
          <DisapprovedDayOffCard
            userName={user.user.name}
            roleName={user.role.name}
            userEmail={user.user.email}
            userInitials={user.user.initials}
            key={dayOff.id}
            reason={dayOff.reason}
            startDate={dayjs(dayOff.start).format('MMMM D, YYYY')}
            endDate={dayjs(dayOff.end).format('MMMM D, YYYY')}
            actions={
              <div className="grid grid-cols-2 py-1">
                <div className="flex w-full h-full items-center justify-center">
                  <button onClick={() => manageStatus(dayOff.id, 'remove')} className="text-red-900 p-2">
                    <XCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex w-full h-full items-center justify-center">
                  <button onClick={() => manageStatus(dayOff.id, 'approve')} className="text-green-900 p-2">
                    <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            }
          />
        ) : null;
      })}
    </ul>
  );
}
