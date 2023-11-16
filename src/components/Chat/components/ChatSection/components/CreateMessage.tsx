import React, { useRef, useState } from 'react';
import DropdownForMention from './DropdownForMention';
import { useSendMessageToChat } from '../../../../../features/chat/chatService';
import ChatEmoticons from '../../../../../assets/icons/ChatEmoticons';
import ChatFile from '../../../../../assets/icons/ChatFile';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setSelectedMessage } from '../../../../../features/chat/chatSlice';
import { IMentionUser, IMessage, IReplyOn } from '../../../../../features/chat/chat.interfaces';
import ChatRemoveReply from '../../../../../assets/icons/ChatRemoveReply';

interface IParsedMessage {
  value: string;
  user?: IMentionUser;
}

export const generateMessageWithUserNames = (messageData: IMessage | IReplyOn): IParsedMessage[] => {
  if (messageData.mention_users.length) {
    const newMessage = messageData.message;
    const splitedMessage = newMessage.split(' ');
    const parsedMessage: IParsedMessage[] = [];
    splitedMessage.forEach((part) => {
      if (part.includes('@')) {
        const currentId = part.replace('@[', '').replace(']', '');
        const currentUser = messageData.mention_users.find((user) => user.id === currentId);
        parsedMessage.push({ value: `@${currentUser?.name} `, user: currentUser });
      } else {
        parsedMessage.push({ value: `${part} ` });
      }
    });
    return parsedMessage;
  }
  return [{ value: messageData.message }];
};

interface CreateMessageProps {
  chatId: string | null;
}

export default function CreateMessage({ chatId }: CreateMessageProps) {
  const dispatch = useAppDispatch();

  const { selectedMessage } = useAppSelector((state) => state.chat);

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
          chatId,
          selectedMessage: selectedMessage as IMessage | null
        });

        messageRef.current.value = '';
        setError('');
        setSelectedMembers([]);
        dispatch(setSelectedMessage(null));
      }
    }
  };

  return (
    <>
      {selectedMessage ? (
        <div className="flex justify-between px-4 pt-4 pb-2 bg-alsoit-gray-50">
          <div
            className="relative p-1 bg-white rounded-md border-gray-300 shadow-sm sm:text-sm overflow-hidden"
            style={{ minWidth: '217px', maxWidth: '90%' }}
          >
            <div className="absolute h-full bg-alsoit-purple-300 left-0 top-0" style={{ width: '2px' }} />
            <div className="ml-2 text-alsoit-purple-300 text-sm">{selectedMessage.team_member.user.name}</div>
            <div className="ml-2 text-alsoit-gray-75">
              {generateMessageWithUserNames(selectedMessage).map((item, index) => (
                <span key={index}>{item.value}</span>
              ))}
            </div>
          </div>
          <div className="cursor-pointer" onClick={() => dispatch(setSelectedMessage(null))}>
            <ChatRemoveReply />
          </div>
        </div>
      ) : null}
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
    </>
  );
}
