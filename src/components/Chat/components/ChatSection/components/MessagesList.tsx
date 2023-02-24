import React, { useMemo } from 'react';
import moment from 'moment';
import { IMessage } from '../../../../../features/chat/chat.interfaces';
import { useChatScroll } from '../../../../../hooks';
import AvatarWithInitials from '../../../../avatar/AvatarWithInitials';
import DropdownMenuForMessage from './DropdownMenuForMessage';
import { mentionTeamMemberInMessageReg } from '../../../../../regex';
import { useAppSelector } from '../../../../../app/hooks';
import { cl } from '../../../../../utils';

interface MessagesListProps {
  messages: IMessage[];
}

export default function MessagesList({ messages }: MessagesListProps) {
  const ref = useChatScroll(messages);
  const { currentUserId } = useAppSelector((state) => state.auth);

  const sortedByTimeMessages = useMemo(
    () => [
      ...messages.sort((a, b) => a.created_at.localeCompare(b.created_at)),
    ],
    [messages]
  );

  const isCurrentUser = (id: string) => id === currentUserId;

  return (
    <div className="p-2">
      <div
        ref={ref}
        className="flex flex-col h-full w-full border rounded-xl overflow-y-scroll"
      >
        {sortedByTimeMessages.map((message) => (
          <div
            className={cl(
              'flex gap-3 px-2 py-1',
              isCurrentUser(message.team_member.user.id)
                ? 'justify-end'
                : 'justify-start'
            )}
            key={message.id}
          >
            {/* avatar */}
            {!isCurrentUser(message.team_member.user.id) ? (
              <AvatarWithInitials
                initials={message.team_member.initials}
                backgroundColour={message.team_member.colour}
              />
            ) : null}

            <div className="w-3/4">
              <div className="flex group flex-col justify-start gap-1 p-2 rounded-xl border">
                {/* top */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <p>{message.team_member.user.name}</p>
                  <DropdownMenuForMessage />
                </div>

                {/* message */}
                <p className="text-black">
                  {message.message.replaceAll(
                    mentionTeamMemberInMessageReg,
                    ''
                  )}
                </p>

                {/* bottom */}
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
