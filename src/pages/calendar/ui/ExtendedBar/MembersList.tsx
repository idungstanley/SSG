import { useAppSelector } from '../../../../app/hooks';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import { selectCalendar } from '../../../../features/calendar/slice/calendarSlice';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';
import AvatarWithImage from '../../../../components/avatar/AvatarWithImage';

interface MembersListProps {
  members: ITeamMembersAndGroup[];
  onCheckbox: (i: boolean, id: string, hubId: string) => void;
  hubId: string;
  place: string;
}

export function MembersList({ members, onCheckbox, hubId, place }: MembersListProps) {
  const { blacklistIds } = useAppSelector(selectCalendar);

  return (
    <ul className="px-2">
      {members.map((member) => (
        <li
          className="py-2 grid grid-cols-autoFr items-center space-x-3"
          key={member.id}
          style={{ paddingLeft: place === 'menu' ? '17px' : '0' }}
        >
          <div className="hr-checkbox-wrapper flex justify-center items-center">
            <Checkbox
              styles="text-primary-500 focus:ring-primary-500 hr-checkbox"
              checked={blacklistIds.includes(member.id + '_' + hubId)}
              setChecked={(e) => onCheckbox(e, member.id, hubId)}
            />
          </div>

          <div className="flex">
            <div
              className={`group flex gap-2 items-center justify-start rounded-full ${place === 'menu' ? 'ml-4' : ''}`}
              style={{ border: '.5px solid #F7A100', padding: '1px' }}
            >
              <div
                title={member.user.name}
                className={`bg-gray-200 relative ${
                  place === 'menu' ? 'w-5 h-5' : 'w-7 h-7'
                } rounded-full p-2 flex items-center justify-center transform transition`}
                style={{
                  backgroundColor: member.user.color ? member.user.color : 'gray'
                }}
              >
                {member.is_online && (
                  <span
                    className="absolute z-10 border-2 border-white w-3 h-3 rounded-full bg-green-500"
                    style={{ top: '-4px', right: '-4px' }}
                  />
                )}
                {member.user.avatar_path && (
                  <div className="border-2 border-red-400 rounded-full">
                    <AvatarWithImage
                      image_path={member.user.avatar_path}
                      height={place === 'menu' ? 'h-5' : 'h-7'}
                      width={place === 'menu' ? 'w-5' : 'w-7'}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="ml-2">
              <h3 className="text-sm font-semibold leading-6 text-gray-900 text-left" style={{ fontSize: '13px' }}>
                {member.user.name}
              </h3>
              {place !== 'menu' && <p className="truncate text-xs leading-5 text-gray-500">{member.user.email}</p>}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
