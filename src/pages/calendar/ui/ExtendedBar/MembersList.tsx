import { useAppSelector } from '../../../../app/hooks';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import { selectCalendar } from '../../../../features/calendar/slice/calendarSlice';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';

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

          <div>
            <h3 className="text-sm font-semibold leading-6 text-gray-900">{member.user.name}</h3>
            <p className="truncate text-xs leading-5 text-gray-500">{member.user.email}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}