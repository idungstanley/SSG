import { useAppSelector } from '../../../../app/hooks';
import { selectCalendar } from '../../../../features/calendar/slice/calendarSlice';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import AvatarWithImage from '../../../../components/avatar/AvatarWithImage';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';

interface HrMenuMembersListProps {
  members: ITeamMembersAndGroup[];
  onCheckboxHr: (i: boolean, id: string, hubId: string) => void;
  hubId: string;
}

export function HrMenuListMembers({ members, onCheckboxHr, hubId }: HrMenuMembersListProps) {
  const { blacklistIds } = useAppSelector(selectCalendar);

  return (
    <ul className="px-2">
      {members.map((member) => (
        <li
          className="py-2 grid grid-cols-autoFr items-center space-x-3"
          key={member.id}
          style={{ paddingLeft: '17px' }}
        >
          <div className="hr-checkbox-wrapper flex justify-center items-center">
            <Checkbox
              styles="text-primary-500 focus:ring-primary-500 hr-checkbox"
              checked={blacklistIds.includes(member.id + '_' + hubId)}
              setChecked={(e) => onCheckboxHr(e, member.id, hubId)}
            />
          </div>

          <div className="flex">
            <div className="group flex gap-2 items-center justify-start ml-4">
              <div
                title={member.user.name}
                className="bg-gray-200 relative w-5 h-5 rounded-full p-2 flex items-center justify-center transform transition"
                style={{
                  backgroundColor: member.user.color ? member.user.color : ''
                }}
              >
                {member.user.avatar_path ? (
                  <div className="border-2 border-red-400 rounded-full">
                    <AvatarWithImage image_path={member.user.avatar_path} height="h-5" width="w-5" />
                  </div>
                ) : (
                  <span className="text-white font-medium" style={{ fontSize: '10px' }}>
                    {member.user.initials}
                  </span>
                )}
              </div>
            </div>

            <div className="ml-2">
              <h3 className="text-sm font-semibold leading-6 text-gray-900">{member.user.name}</h3>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
