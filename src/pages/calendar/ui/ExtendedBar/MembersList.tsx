import { useAppSelector } from '../../../../app/hooks';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import { selectCalendar } from '../../../../features/calendar/slice/calendarSlice';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';
import AvatarWithImage from '../../../../components/avatar/AvatarWithImage';

interface MembersListProps {
  members: ITeamMembersAndGroup[];
  onCheckbox: (i: boolean, id: string) => void;
}

export function MembersList({ members, onCheckbox }: MembersListProps) {
  const { blacklistIds } = useAppSelector(selectCalendar);

  return (
    <ul className="px-2">
      {members.map((member) => (
        <li className="py-2 grid grid-cols-autoFr items-center space-x-3" key={member.id}>
          <Checkbox
            styles="text-primary-500 focus:ring-primary-500"
            checked={!blacklistIds.includes(member.id)}
            setChecked={(e) => onCheckbox(e, member.id)}
          />

          <div className="flex">
            <div className="group flex gap-2 items-center justify-start">
              <div
                title={member.user.name}
                className="bg-gray-200 relative w-7 h-7 rounded-full p-2 flex items-center justify-center transform transition"
                style={{
                  backgroundColor: member.user.color ? member.user.color : ''
                }}
              >
                {member.user.avatar_path ? (
                  <div className="border-2 border-red-400 rounded-full">
                    <AvatarWithImage image_path={member.user.avatar_path} height="h-7" width="w-7" />
                  </div>
                ) : (
                  <span className="text-white">{member.user.initials}</span>
                )}
              </div>
            </div>

            <div className="ml-2">
              <h3 className="text-sm font-semibold leading-6 text-gray-900">{member.user.name}</h3>
              <p className="truncate text-xs leading-5 text-gray-500">{member.user.email}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
