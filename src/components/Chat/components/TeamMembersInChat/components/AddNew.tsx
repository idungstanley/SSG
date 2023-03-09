import React from 'react';
import { Spinner } from '../../../../../common';
import { useAddTeamMemberToChat, useGetChat } from '../../../../../features/chat/chatService';
import { useGetTeamMembers } from '../../../../../features/settings/teamMembers/teamMemberService';
import SelectMenuTeamMembers, { ISelectedData } from '../../../../selectMenu';

interface AddNewProps {
  chatId: string;
}

export default function AddNew({ chatId }: AddNewProps) {
  const { data, status } = useGetTeamMembers({ page: 0, query: '' });
  const teamMembers = data?.data.team_members;

  const { data: dt } = useGetChat(chatId);
  const memberIds = dt?.chat.team_members.map((member) => member.id);

  // get unique members that are not in watchers list
  const membersWithoutActive = teamMembers?.filter((member) => !memberIds?.includes(member.id));

  const { mutate: onCreate } = useAddTeamMemberToChat(chatId);

  const handleChange = (member: ISelectedData | null) => {
    if (member) {
      onCreate({
        chatId,
        teamMemberId: member.id
      });
    }
  };

  if (status === 'loading') {
    return (
      <div className="mx-auto w-6 mt-5 justify-center">
        <Spinner size={8} color="#0F70B7" />
      </div>
    );
  }

  return membersWithoutActive ? (
    membersWithoutActive.length ? (
      <SelectMenuTeamMembers
        teamMembers={membersWithoutActive.map((i) => ({
          id: i.id,
          name: i.name || i.user.name,
          email: i.user?.email,
          accessLevel: i.id,
          type: 'member'
        }))}
        selectedData={null}
        setSelectedData={handleChange}
        title={`Add new member to ${dt?.chat.name}:`}
        showEmail
      />
    ) : null
  ) : null;
}
