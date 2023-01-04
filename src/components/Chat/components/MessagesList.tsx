import React from 'react';
import { IMessage } from '../../../features/chat/chat.interfaces';
import AvatarWithInitials from '../../avatar/AvatarWithInitials';

interface MessagesListProps {
  messages: IMessage[];
}

function useChatScroll<T>(dep: T) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}

export default function MessagesList({ messages }: MessagesListProps) {
  const ref = useChatScroll(messages);

  return (
    <div ref={ref} className="flex flex-col gap-4 max-h-96 overflow-y-scroll">
      {messages.map((message) => (
        <div className="flex gap-3 items-center" key={message.id}>
          <AvatarWithInitials
            initials={message.team_member.initials}
            backgroundColour={message.team_member.colour}
          />
          <div className="flex flex-col justify-start gap-1 p-2 rounded-xl border">
            <p className="text-sm text-gray-600">
              {message.team_member.user.name}
            </p>
            <p className="text-gray-600">{message.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
