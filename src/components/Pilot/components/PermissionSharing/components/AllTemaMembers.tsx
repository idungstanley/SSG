import React from 'react';
import { ITeamMembersAndGroup } from '../../../../../features/settings/teamMembersAndGroups.interfaces';
import People from './People';
import { IPermissionsRes } from '../../../../../features/workspace/workspace.interfaces';

interface allTeamProps {
  temaMembersandGroups: ITeamMembersAndGroup[];
  entityPermissions: IPermissionsRes;
}

function AllTemaMembers({ temaMembersandGroups, entityPermissions }: allTeamProps) {
  const memberAndGroups = [...entityPermissions.data.team_member_groups, ...entityPermissions.data.team_members];

  return (
    <div className="my-4">
      <h1>All Team members</h1>
      <div>
        {temaMembersandGroups.map((teamMember) => {
          const enabled = memberAndGroups.find((i) => {
            return i.team_member?.id === teamMember.id;
          });
          return (
            <div key={teamMember.id} className="my-1">
              <People showToggle={true} teamMember={teamMember} enabled={enabled ? true : false} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllTemaMembers;
