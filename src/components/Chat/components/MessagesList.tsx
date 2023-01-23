import React, { useMemo } from 'react';
import moment from 'moment';
import { IMessage } from '../../../features/chat/chat.interfaces';
import { useChatScroll } from '../../../hooks';
import AvatarWithInitials from '../../avatar/AvatarWithInitials';
import DropdownMenuForMessage from './DropdownMenuForMessage';
import { mentionTeamMemberInMessageReg } from '../../../regex';

interface MessagesListProps {
  messages: IMessage[];
}

export default function MessagesList({ messages }: MessagesListProps) {
  const ref = useChatScroll(messages);

  const sortedByTime = useMemo(
    () => [
      ...messages.sort((a, b) => a.created_at.localeCompare(b.created_at)),
    ],
    [messages]
  );

  return (
    <div className="p-2">
      <div
        ref={ref}
        className="flex h-full w-full border rounded-xl overflow-y-scroll"
      >
        {sortedByTime.map((message) => (
          <div className="flex gap-3 items-center px-2 py-1" key={message.id}>
            <AvatarWithInitials
              initials={message.team_member.initials}
              backgroundColour={message.team_member.colour}
            />
            <div className="w-3/4">
              <div className="flex group flex-col justify-start gap-1 p-2 rounded-xl border">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <p>{message.team_member.user.name}</p>
                  <DropdownMenuForMessage />
                </div>
                <p className="text-black">
                  {message.message.replaceAll(
                    mentionTeamMemberInMessageReg,
                    ''
                  )}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {message.mention_users?.map((user) => (
                      <div
                        key={user.id}
                        className="px-3 py-1 text-xs bg-indigo-100 border border-primary-400 rounded-2xl"
                      >
                        {user.name}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    {moment(message.created_at).format('HH:mm')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
