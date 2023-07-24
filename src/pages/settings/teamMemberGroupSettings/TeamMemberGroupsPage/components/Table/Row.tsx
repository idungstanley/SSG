import React from 'react';
import { Link } from 'react-router-dom';
import { useGetTeamMemberGroup } from '../../../../../../features/settings/teamMemberGroups/teamMemberGroupService';
import { AvatarWithInitials } from '../../../../../../components';
import { OutputDateTime } from '../../../../../../app/helpers';
import { useAppSelector } from '../../../../../../app/hooks';

interface RowProps {
  teamMemberGroupId: string;
}

export default function Row({ teamMemberGroupId }: RowProps) {
  const { data: teamMemberGroup, status } = useGetTeamMemberGroup(teamMemberGroupId);
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  return status === 'success' && teamMemberGroup != null ? (
    <tr key={teamMemberGroup.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <AvatarWithInitials initials={teamMemberGroup.initials} backgroundColour={teamMemberGroup.colour} />
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">
              <Link to={`/${currentWorkspaceId}/settings/team-members/groups/${teamMemberGroup.id}`}>
                {teamMemberGroup.name}
              </Link>
            </div>
            <div className="text-gray-500">{`${teamMemberGroup.group_team_members.length} members`}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {OutputDateTime(teamMemberGroup.created_at, null)}
      </td>
    </tr>
  ) : null;
}
