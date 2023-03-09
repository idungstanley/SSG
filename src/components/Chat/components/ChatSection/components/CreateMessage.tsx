import React, { useRef, useState } from 'react';
import DropdownForMention from './DropdownForMention';
import { useSendMessageToChat } from '../../../../../features/chat/chatService';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface CreateMessageProps {
  chatId: string | null;
}

export default function CreateMessage({ chatId }: CreateMessageProps) {
  const { mutate: onSendMessage } = useSendMessageToChat();

  const messageRef = useRef<HTMLInputElement>(null);

  const [selectedMembers, setSelectedMembers] = useState<{ id: string; name: string }[]>([]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = messageRef.current?.value;

    if (message && message.length > 2) {
      const messageWithUserIds = `${message} ${selectedMembers.map((user) => `@[${user.id}] `)}`.trim();

      onSendMessage({
        message: messageWithUserIds,
        chatId
      });

      messageRef.current.value = '';
      setSelectedMembers([]);
    }
  };

  return (
    <form className="relative flex gap-3 items-center p-2" onSubmit={(e) => sendMessage(e)}>
      <input
        type="text"
        placeholder="message"
        ref={messageRef}
        className="block w-full rounded-md border-gray-300 shadow-sm ring-0 focus:ring-0 sm:text-sm"
      />
      <DropdownForMention selectedUsers={selectedMembers} setSelectedUsers={setSelectedMembers} />
      <button type="submit" className="inline-flex items-center cursor-pointer">
        <PaperAirplaneIcon className="h-6 w-6 stroke-current text-indigo-600 inline-block" aria-hidden="true" />
      </button>
    </form>
  );
}
