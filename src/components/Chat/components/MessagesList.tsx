import React from 'react';
import moment from 'moment';
import { IMessage } from '../../../features/chat/chat.interfaces';
import { useChatScroll } from '../../../hooks';
import AvatarWithInitials from '../../avatar/AvatarWithInitials';
import DropdownMenuForMessage from './DropdownMenuForMessage';

interface MessagesListProps {
  messages: IMessage[];
}

export default function MessagesList({ messages }: MessagesListProps) {
  const ref = useChatScroll(messages);

  return (
    <div
      ref={ref}
      className="flex flex-col h-96 border rounded-xl overflow-y-scroll"
    >
      {messages.map((message) => (
        <div className="flex gap-3 items-center px-2 py-1" key={message.id}>
          <AvatarWithInitials
            initials={message.team_member.initials}
            backgroundColour={message.team_member.colour}
          />
          <div className="flex group flex-col justify-start gap-1 p-2 rounded-xl border w-1/2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <p>{message.team_member.user.name}</p>
              <DropdownMenuForMessage />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-black">{message.message}</p>
              <p className="text-sm text-gray-500">{moment(message.created_at).format('HH:mm')}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
