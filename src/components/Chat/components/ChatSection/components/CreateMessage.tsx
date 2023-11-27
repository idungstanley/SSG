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
            className="relative p-1 overflow-hidden bg-white border-gray-300 rounded-md shadow-sm sm:text-sm"
            style={{ minWidth: '217px', maxWidth: '90%' }}
          >
            <div className="absolute top-0 left-0 h-full bg-alsoit-purple-300" style={{ width: '2px' }} />
            <div className="ml-2 text-sm text-alsoit-purple-300">{selectedMessage.team_member.user.name}</div>
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
        className="relative flex items-center gap-2 p-2 rounded-bl-md rounded-br-md"
        onSubmit={(e) => sendMessage(e)}
        style={{ background: '#919191' }}
      >
        <div
          className="flex items-center justify-center h-6 bg-white rounded-md cursor-pointer"
          style={{ minWidth: '24px' }}
        >
          <ChatEmoticons />
        </div>

        <DropdownForMention selectedUsers={selectedMembers} setSelectedUsers={setSelectedMembers} />

        <div
          className="flex items-center justify-center h-6 bg-white rounded-md cursor-pointer"
          style={{ minWidth: '24px' }}
        >
          <ChatFile />
        </div>
        <div className="relative w-full">
          {error ? <span className="absolute text-red-500 -top-1 left-3">{error}</span> : null}
          <input
            type="text"
            placeholder="Type Message..."
            ref={messageRef}
            className="block w-full border-gray-300 rounded-md shadow-sm ring-0 focus:ring-0 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-10 h-6 font-semibold text-white rounded bg-alsoit-purple-300 text-alsoit-text-sm"
          style={{ background: 'rgb(191, 1, 254)' }}
        >
          Send
        </button>
      </form>
    </>
  );
}
