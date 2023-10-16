import React from 'react';
import Row from './Row';
import { TeamMembersProps } from '.';

export default function Body({ teamMembers }: TeamMembersProps) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {teamMembers &&
        teamMembers.data.team_members.map((teamMember) => <Row key={teamMember.id} teamMemberId={teamMember.id} />)}
    </tbody>
  );
}
