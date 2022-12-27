import React from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserRemoveIcon } from '@heroicons/react/outline';
import { removeTeamMemberFromGroupService } from '../../../../../../features/settings/teamMemberGroups/teamMemberGroupService';
import {
  AvatarWithInitials,
  StatusDot,
  Dropdown,
} from '../../../../../../components';
import { ITeamMemberGroup } from '../../../../../../features/settings/teamMemberGroups/teamMemberGroups.interfaces';

interface RowProps {
  groupTeamMember: ITeamMemberGroup;
}

export default function Row({ groupTeamMember }: RowProps) {
  const queryClient = useQueryClient();

  const removeTeamMemberFromGroupMutation = useMutation(
    removeTeamMemberFromGroupService,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          'team_member_group',
          groupTeamMember.team_member_group_id,
        ]);
      },
    }
  );

  const removeTeamMemberFromGroup = () => {
    removeTeamMemberFromGroupMutation.mutate({
      teamMemberGroupId: groupTeamMember.team_member_group_id,
      teamMemberId: groupTeamMember.team_member_id,
    });
  };

  return (
    <tr key={groupTeamMember.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <StatusDot
              on={
                <AvatarWithInitials
                  initials={groupTeamMember.team_member.initials}
                  backgroundColour={groupTeamMember.team_member.colour}
                />
              }
            />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">
              {groupTeamMember.team_member.user.name}
            </div>
            <div className="text-gray-500">
              {groupTeamMember.team_member.user.email}
            </div>
          </div>
        </div>
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 z-100 justify-center align-center items-center">
        <div className="mt-1.5">
          <Dropdown
            items={[
              {
                label: 'Remove from group',
                onClick: removeTeamMemberFromGroup,
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

Row.propTypes = {
  groupTeamMember: PropTypes.object.isRequired,
};
