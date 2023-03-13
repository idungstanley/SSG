import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useGetChat } from '../../../../../features/chat/chatService';
import { useDeleteTeamMemberFromChat } from '../../../../../features/chat/chatService';
import FullScreenMessage from '../../../../CenterMessage/FullScreenMessage';
import { Spinner } from '../../../../../common';
import AvatarWithInitials from '../../../../avatar/AvatarWithInitials';

interface ListProps {
  chatId: string;
}

export default function List({ chatId }: ListProps) {
  const { data, status } = useGetChat(chatId);
  const members = data?.chat.team_members;

  const { mutate: onRemove } = useDeleteTeamMemberFromChat(chatId);

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

  const handleRemove = (id: string) => {
    onRemove({
      chatId,
      teamMemberId: id
    });
  };

  return members ? (
    members.length ? (
      <div>
        <h3>Members list:</h3>
        <ul role="list" className="divide-y divide-gray-200">
          {members.map((member) => (
            <li key={member.id} className="flex py-4 w-full items-center justify-between">
              <div className="flex">
                <AvatarWithInitials initials={member.initials} backgroundColour={member.colour} />

                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{member.user.name}</p>
                  <p className="text-sm text-gray-500">{member.user.email}</p>
                </div>
              </div>

              <TrashIcon
                onClick={() => handleRemove(member.id)}
                className="w-6 h-6 text-gray-300 cursor-pointer hover:text-red-500 transition-all duration-300"
              />
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <FullScreenMessage title="You have no watchers yet" description="Get started by creating a new" />
    )
  ) : null;
}
