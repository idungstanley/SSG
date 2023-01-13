import React, { useState } from 'react';
import Input from '../../input/Input';
import DropdownForMention from './DropdownForMention';
import { useSendMessageToChat } from '../../../features/chat/chatService';
import { PaperAirplaneIcon } from '@heroicons/react/outline';

interface CreateMessageProps {
  chatId: string | null;
}

export default function CreateMessage({ chatId }: CreateMessageProps) {
  const { mutate: onSendMessage } = useSendMessageToChat();
  const [message, setMessage] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<
    { id: string; name: string }[]
  >([]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.length > 2) {
      const messageWithUserIds = `${message} ${selectedMembers.map(
        (user) => `@[${user.id}] `
      )}`;

      onSendMessage({
        message: messageWithUserIds,
        chatId,
      });
      setMessage('');
      setSelectedMembers([]);
    }
  };

  return (
    <form
      className="relative flex gap-3 items-center"
      onSubmit={(e) => sendMessage(e)}
    >
      <Input
        name="message"
        value={message}
        placeholder="enter message:"
        onChange={(e) => setMessage(e.target.value)}
      />
      <DropdownForMention
        selectedUsers={selectedMembers}
        setSelectedUsers={setSelectedMembers}
      />
      <button type="submit" className="inline-flex items-center cursor-pointer">
        <PaperAirplaneIcon
          style={{ rotate: '90deg' }}
          className="h-6 w-6 stroke-current text-indigo-600 inline-block"
          aria-hidden="true"
        />
      </button>
    </form>
  );
}
