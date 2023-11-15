import { useMemo } from 'react';
import moment from 'moment';
import { IMessage } from '../../../../../features/chat/chat.interfaces';
import { useChatScroll } from '../../../../../hooks';
import AvatarWithInitials from '../../../../avatar/AvatarWithInitials';
import DropdownMenuForMessage from './DropdownMenuForMessage';
import { useAppSelector } from '../../../../../app/hooks';
import { cl } from '../../../../../utils';
import { generateMessageWithUserNames } from './CreateMessage';

interface MessagesListProps {
  messages: IMessage[];
}

export default function MessagesList({ messages }: MessagesListProps) {
  const ref = useChatScroll(messages);
  const { currentUserId } = useAppSelector((state) => state.auth);

  const sortedByTimeMessages = useMemo(
    () => [...messages.sort((a, b) => a.created_at.localeCompare(b.created_at))],
    [messages]
  );

  const isCurrentUser = (id: string) => id === currentUserId;

  return (
    <div className="p-2 bg-white border rounded-xl">
      <div ref={ref} className="flex flex-col h-full w-full overflow-y-scroll">
        {sortedByTimeMessages.map((message) => (
          <div
            className={cl(
              'flex items-start gap-3 px-2 py-1',
              isCurrentUser(message.team_member.user.id) ? 'justify-end' : 'justify-start'
            )}
            key={message.id}
          >
            {/* avatar */}
            <AvatarWithInitials
              initials={message.team_member.user.initials}
              backgroundColour={message.team_member.user.color}
            />

            <div className="w-3/4" style={{ background: '#F4F4F4' }}>
              <div className="flex group flex-col justify-start gap-1 p-2 rounded-xl border">
                {/* top */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  {/* {!isCurrentUser(message.team_member.user.id) ? <p>{message.team_member.user.name}</p> : null} */}
                  <p>{message.team_member.user.name}</p>
                  <DropdownMenuForMessage message={message} />
                </div>

                {message?.reply_on ? (
                  <div className="relative w-full p-1 bg-alsoit-purple-50 shadow-sm sm:text-sm overflow-hidden">
                    <div className="absolute h-full bg-alsoit-purple-300 left-0 top-0" style={{ width: '2px' }} />
                    <div className="ml-2 text-alsoit-purple-300 text-sm">{message.reply_on.team_member.user.name}</div>
                    <div className="ml-2">{generateMessageWithUserNames(message.reply_on)}</div>
                  </div>
                ) : null}

                <div className="flex justify-between">
                  {/* message */}
                  <div className="flex items-center">
                    <p className="text-alsoit-purple-300">{generateMessageWithUserNames(message)}</p>
                  </div>

                  {/* bottom */}
                  <div className="flex items-end pl-3">
                    <p className="text-xs text-gray-500">{moment(message.created_at).format('HH:mm')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
