import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { AvatarWithInitials } from '../../../../components';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';
import { useDaysOff } from '../../lib/daysOffContext';
import { filterDaysOff } from '../../lib/filterDaysOff';
import { isOwner } from '../../lib/isOwner';

export const getUser = (members: ITeamMembersAndGroup[], id: string) => {
  return members.find((i) => i.user.id === id);
};

export default function ManagePage() {
  const { data } = useGetTeamMembers({ page: 1, query: '' });
  const members = data?.data.team_members ?? [];

  const owner = isOwner(members);

  const { daysOff, manageStatus } = useDaysOff();

  if (!owner) {
    return <div>You have no right to do this</div>;
  }

  const disapprovedDaysOff = filterDaysOff(daysOff, 'disapproved');

  return (
    <div className="w-full p-4">
      <div className="w-fit mx-auto">
        <ul role="list" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {disapprovedDaysOff.map((dayOff) => (
            <li key={dayOff.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
              {/* user info */}
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      {getUser(members, dayOff.user.id)?.user.name}
                    </h3>
                    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {getUser(members, dayOff.user.id)?.role.name}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-500">{getUser(members, dayOff.user.id)?.user.email}</p>
                </div>
                <AvatarWithInitials initials={getUser(members, dayOff.user.id)?.user.initials ?? ''} />
              </div>

              {/* day off info */}
              <dl className="divide-y divide-gray-100 px-2 py-1 text-sm leading-6">
                <div className="flex justify-between gap-x-4 py-1">
                  <dt className="text-gray-500">Start</dt>
                  <dd className="text-gray-700">
                    <p>{dayjs(dayOff.start).format('MMMM D, YYYY')}</p>
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-1">
                  <dt className="text-gray-500">End</dt>
                  <dd className="text-gray-700">
                    <p>{dayjs(dayOff.end).format('MMMM D, YYYY')}</p>
                  </dd>
                </div>
                <div className="py-1">
                  <dd className="text-gray-700">
                    <p>{dayOff.reason}</p>
                  </dd>
                </div>
              </dl>

              {/* actions */}
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
