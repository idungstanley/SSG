import React from 'react';
import Row from './Row';
import { TeamMembersProps } from '.';
import { useAppSelector } from '../../../../../../app/hooks';

export default function Body({ teamMembers }: TeamMembersProps) {
  const { currentUserId } = useAppSelector((state) => state.auth);
  const myData = teamMembers.data.team_members.find((member) => {
    const data = member.user.id === currentUserId;
    return data;
  });

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {teamMembers &&
        teamMembers.data.team_members.map((teamMember) => (
          <Row key={teamMember.id} teamMemberId={teamMember.id} myRole={myData?.role.name as string} />
        ))}
    </tbody>
  );
}
