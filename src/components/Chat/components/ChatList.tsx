import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { useDeleteChat, useGetChats } from '../../../features/chat/chatService';
import FullScreenMessage from '../../CenterMessage/FullScreenMessage';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Spinner } from '../../../common';

interface ChatsListProps {
  selectChat: (i: string) => void;
}

export default function ChatsList({ selectChat }: ChatsListProps) {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const { id, type } = pilotSideOver;

  const { mutate: onDelete } = useDeleteChat();

  const { data, status } = useGetChats({
    type,
    id,
  });

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  return status === 'loading' ? (
    <div className="mx-auto w-6 mt-5 justify-center">
      <Spinner size={8} color="#0F70B7" />
    </div>
  ) : !data?.length ? (
    <FullScreenMessage title="No chats." description="Create one." />
  ) : (
    <ul role="list" className="divide-y divide-gray-200 flex flex-wrap">
      {data?.map((chat) => (
        <li
          key={chat.id}
          className="grid grid-cols-sidebarItem items-center justify-between w-full hover:bg-gray-100 p-2"
        >
          {/* avatar */}
          <span
            onClick={() => selectChat(chat.id)}
            className="flex items-center cursor-pointer justify-center p-1 rounded-full w-12 h-12 bg-indigo-600 text-white pb-1 uppercase font-medium text-xl"
          >
            {chat.name.slice(0, 2)}
          </span>

          {/* chat name and last message */}
          <div
            onClick={() => selectChat(chat.id)}
            className="ml-3 cursor-pointer"
          >
            <p className="font-medium text-gray-900">{chat.name}</p>
            <p className="text-sm text-gray-500">message</p>
          </div>

          {/* action buttons */}
          <div className="flex items-center gap-2">
            <span className="flex bg-indigo-600 text-xs text-white w-6 h-6 justify-center items-center rounded-full">
              {chat.new_messages_count}
            </span>
            <TrashIcon
              onClick={() => handleDelete(chat.id)}
              className="h-5 w-5 cursor-pointer"
              aria-hidden="true"
              id="trashIcon"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
