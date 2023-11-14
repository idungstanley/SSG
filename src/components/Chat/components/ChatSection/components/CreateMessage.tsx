import React, { useRef, useState } from 'react';
import DropdownForMention from './DropdownForMention';
import { useSendMessageToChat } from '../../../../../features/chat/chatService';
import ChatEmoticons from '../../../../../assets/icons/ChatEmoticons';
import ChatFile from '../../../../../assets/icons/ChatFile';

interface CreateMessageProps {
  chatId: string | null;
}

export default function CreateMessage({ chatId }: CreateMessageProps) {
  const [error, setError] = useState<string>('');

  const { mutate: onSendMessage } = useSendMessageToChat();

  const messageRef = useRef<HTMLInputElement>(null);

  const [selectedMembers, setSelectedMembers] = useState<{ id: string; name: string }[]>([]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = messageRef.current?.value;

    if (message) {
      if (message.length <= 2) {
        setError('Short message');
      } else {
        const messageWithUserIds = `${message} ${selectedMembers.map((user) => `@[${user.id}] `)}`.trim();

        onSendMessage({
          message: messageWithUserIds,
          chatId
        });

        messageRef.current.value = '';
        setError('');
        setSelectedMembers([]);
      }
    }
  };

  return (
    <form
      className="relative flex gap-2 items-center p-2 rounded-bl-md rounded-br-md"
      onSubmit={(e) => sendMessage(e)}
      style={{ background: '#919191' }}
    >
      <div
        className="flex justify-center bg-white items-center h-6 cursor-pointer rounded-md"
        style={{ minWidth: '24px' }}
      >
        <ChatEmoticons />
      </div>

      <DropdownForMention selectedUsers={selectedMembers} setSelectedUsers={setSelectedMembers} />

      <div
        className="flex justify-center bg-white items-center h-6 cursor-pointer rounded-md"
        style={{ minWidth: '24px' }}
      >
        <ChatFile />
      </div>
      <div className="relative w-full">
        {error ? <span className="absolute -top-1 left-3 text-red-500">{error}</span> : null}
        <input
          type="text"
          placeholder="Type Message..."
          ref={messageRef}
          className="block w-full rounded-md border-gray-300 shadow-sm ring-0 focus:ring-0 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-10 h-6 bg-alsoit-purple-300 rounded text-white text-alsoit-text-sm font-semibold"
        style={{ background: 'rgb(191, 1, 254)' }}
      >
        Send
      </button>
    </form>
  );
}
