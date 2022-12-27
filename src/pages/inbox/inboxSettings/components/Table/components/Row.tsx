import React from 'react';
import { useParams } from 'react-router-dom';
import { UserRemoveIcon } from '@heroicons/react/outline';
import {
  AvatarWithInitials,
  StatusDot,
  Dropdown,
} from '../../../../../../components';
import { useRemoveTeamMemberOrGroupAccess } from '../../../../../../features/inbox/inboxSettingsService';
import { IInboxMember } from '../../../../../../features/inbox/inbox.interfaces';

interface RowProps {
  item: IInboxMember;
  isGroups: boolean;
}

export default function Row({ item, isGroups }: RowProps) {
  const { inboxId } = useParams();

  const { mutate: onRemoveAccess } = useRemoveTeamMemberOrGroupAccess(inboxId);

  const removeAccess = () => {
    onRemoveAccess({
      inboxId,
      isGroups,
      accessToId: isGroups ? item.team_member_group_id : item.team_member_id,
    });
  };

  const member = isGroups ? item.team_member_group : item.team_member;
  const name = isGroups ? item.team_member_group.name : item.team_member.user.name;
  const secondTitle = isGroups ? 'Groups' : item.team_member.user.email;

  return (
    <tr key={item.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <StatusDot
              on={
                <AvatarWithInitials
                  initials={member.initials}
                  backgroundColour={member.colour}
                />
              }
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">
              {name}
            </div>
            <div className="text-gray-500">{secondTitle}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {item.access_level.name}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 z-100 justify-center align-center items-center">
        <div className="mt-1.5">
          <Dropdown
            items={[
              {
                label: 'Remove access',
                onClick: removeAccess,
                icon: (
                  <UserRemoveIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                ),
              },
            ]}
          />
        </div>
      </td>
    </tr>
  );
}
