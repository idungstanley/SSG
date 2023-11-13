import React from 'react';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';

interface TeamMembersProps {
  members: ITeamMembersAndGroup[];
  selectHrTeamMember: (id: string) => void;
}

export function SelectEmployee({ members, selectHrTeamMember }: TeamMembersProps) {
  return (
    <select
      id="current-tab"
      name="current-tab"
      className="flex items-center h-12 mx-2 border-t opacity-90 w-11/12"
      onChange={(e) => selectHrTeamMember(e.target.value)}
    >
      <option key="0" value="">
        Select employee
      </option>
      {members.map((member) => (
        <option key={member.user.id} value={member.id}>
          {member.user.name}
        </option>
      ))}
    </select>
  );
}
