import { useAppSelector } from '../../../../app/hooks';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import { selectCalendar } from '../../../../features/calendar/slice/calendarSlice';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';
import AvatarWithImage from '../../../../components/avatar/AvatarWithImage';
import ThreeDotIcon from '../../../../assets/icons/ThreeDotIcon';
import React from 'react';

interface MembersListProps {
  members: ITeamMembersAndGroup[];
  onCheckbox: (i: boolean, id: string, hubId: string, uuid: string, type: string) => void;
  hubId: string;
  place: string;
}

export function MembersList({ members, onCheckbox, hubId, place }: MembersListProps) {
  const { hrTeamMembers } = useAppSelector(selectCalendar);

  const checkSelectedMembers = (id: string, hubId: string) => {
    return hrTeamMembers.filter((hrTeamMember) => hrTeamMember.id == id && hrTeamMember.hubId == hubId).length > 0;
  };

  return (
    <ul>
      {members.map((member) => (
        <li
          className="grid items-center py-2 space-x-3 cursor-pointer grid-cols-autoFr hover:bg-alsoit-gray-50"
          key={member.id}
          style={{ paddingLeft: place === 'menu' ? '25px' : '0' }}
        >
          <div
            className={`hr-checkbox-wrapper flex justify-center items-center ${
              checkSelectedMembers(member.id, hubId) ? 'hr-member-checked' : ''
            }`}
          >
            <Checkbox
              styles="text-primary-500 focus:ring-primary-500 hr-checkbox"
              checked={checkSelectedMembers(member.id, hubId)}
              setChecked={(e) => onCheckbox(e, member.id, hubId, member.id + hubId, 'children')}
            />
          </div>

          <div className="relative flex hr-member-item">
            <div
              className="flex items-center justify-start gap-2 rounded-full group"
              style={{
                marginLeft: '6px'
              }}
            >
              <div
                title={member.user.name}
                className="relative flex items-center justify-center transition transform bg-gray-200 rounded-full"
                style={{
                  backgroundColor: member.user.color ? member.user.color : '',
                  width: '14px',
                  height: '14px',
                  border: '0.5px solid #fff',
                  outline: '0.5px solid rgb(247, 161, 0)',
                  padding: '1px'
                }}
              >
                {member.is_online && (
                  <span
                    className="absolute z-10 bg-green-500 border-white rounded-full"
                    style={{ top: '-2px', right: '-2px', width: '7.5px', height: '7.5px', borderWidth: '1px' }}
                  />
                )}
                {member.user.avatar_path && (
                  <div className="rounded-full ">
                    <AvatarWithImage
                      image_path={member.user.avatar_path}
                      height={place === 'menu' ? 'h-4' : 'h-7'}
                      width={place === 'menu' ? 'w-4' : 'w-7'}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="ml-2">
              <h3 className="text-sm font-semibold leading-6 text-left text-gray-900" style={{ fontSize: '13px' }}>
                {member.user.name}
              </h3>
              {place !== 'menu' && <p className="text-xs leading-5 text-gray-500 truncate">{member.user.email}</p>}
            </div>
            <div className="absolute right-0 flex items-center pr-1 space-x-2 text-black opacity-0 hr-member-item-settings z-1 hover:text-fuchsia-500">
              <ThreeDotIcon className="hover:text-alsoit-purple-300" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
