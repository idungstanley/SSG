import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { Spinner } from '../../../common';
import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';
import AvatarWithInitials from '../../avatar/AvatarWithInitials';
import FullScreenMessage from '../../CenterMessage/FullScreenMessage';

export default function Contacts() {
  const { data, status } = useGetTeamMembers({ page: 1, query: '' });
  const { currentUserId } = useAppSelector((state) => state.auth);

  const members = data?.data.team_members;

  const membersWithoutCurrent = members?.filter((member) => member.user.id !== currentUserId);

  if (status === 'error') {
    return <FullScreenMessage title="Oops, an error occurred :(" description="Please try again later." />;
  }

  if (status === 'loading') {
    return (
      <div className="mx-auto w-6 mt-5 justify-center">
        <Spinner size={8} color="#0F70B7" />
      </div>
    );
  }

  return membersWithoutCurrent ? (
    membersWithoutCurrent.length ? (
      <>
        <h2 className="text-lg font-medium text-gray-900 border-b p-2">Contacts</h2>
        <ul role="list" className="divide-y divide-gray-200 p-2">
          {membersWithoutCurrent.map((member) => (
            <li key={member.id} className="flex py-2 w-full items-center justify-between cursor-pointer">
              <div className="flex">
                <AvatarWithInitials initials={member.initials} backgroundColour={member.colour} />

                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{member.user.name}</p>
                  <p className="text-sm text-gray-500">{member.user.email}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    ) : (
      <FullScreenMessage title="You have no members yet" description="Invite one." />
    )
  ) : null;
}
