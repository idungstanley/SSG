import React from 'react';
import moment from 'moment';
import { IMessage } from '../../../features/chat/chat.interfaces';
import { useChatScroll } from '../../../hooks';
import AvatarWithInitials from '../../avatar/AvatarWithInitials';

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
        <div className="flex gap-3 items-center p-2" key={message.id}>
          <AvatarWithInitials
            initials={message.team_member.initials}
            backgroundColour={message.team_member.colour}
          />
          <div className="flex flex-col justify-start gap-1 p-2 rounded-xl border w-1/2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <p>{message.team_member.user.name}</p>
              <p>
                {moment(message.created_at).format('HH:mm')}
              </p>
            </div>

            <p className="text-gray-600">{message.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
