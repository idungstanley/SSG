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

  const { daysOff } = useDaysOff();

  const disapprovedDaysOff = filterDaysOff(daysOff, 'disapproved');

  if (!owner) {
    return <div>You have no right to do this</div>;
  }

  return (
    <div className="w-full p-4">
      <div className="w-fit mx-auto">
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {disapprovedDaysOff.map((dayOff) => (
            <li key={dayOff.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
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
              <div>
                <p>From {dayjs(dayOff.start).format('dddd, MMMM D, YYYY')}</p>
                <p>To {dayjs(dayOff.end).format('dddd, MMMM D, YYYY')}</p>
                <p>Reason: {dayOff.reason}</p>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <button className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold bg-red-50 text-red-900">
                      Disapprove
                    </button>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <button className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold bg-green-50 text-green-900">
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
