import React from 'react';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';

interface TeamMembersProps {
  members: ITeamMembersAndGroup[];
}

export function SelectEmployee(members: TeamMembersProps) {
  return (
    <select id="current-tab" name="current-tab" className="flex items-center h-12 mx-2 border-t opacity-90">
      {members.members.map((member) => (
        <option key={member.user.id} value={member.user.id}>
          {member.user.name}
        </option>
      ))}
    </select>
  );
}
