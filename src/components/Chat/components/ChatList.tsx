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
  const { type, id } = pilotSideOver;

  const { mutate: onDelete } = useDeleteChat();
  const { data, status } = useGetChats({ id, type });

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  return status === 'loading' ? (
    <div className="justify-center w-6 mx-auto mt-5">
      <Spinner size={8} color="#0F70B7" />
    </div>
  ) : !data?.length ? (
    <FullScreenMessage title="No chats." description="Create one." />
  ) : (
    <>
      <h2 className="p-2 text-lg font-medium text-gray-900 border-b">Chats</h2>
      <ul role="list" className="flex flex-wrap divide-y divide-gray-200">
        {data?.map((chat) => (
          <li
            key={chat.id}
            className="grid items-center justify-between w-full p-2 grid-cols-sidebarItem hover:bg-gray-100"
          >
            {/* avatar */}
            <span
              onClick={() => selectChat(chat.id)}
              className="flex items-center justify-center w-12 h-12 p-1 pb-1 text-xl font-medium text-white uppercase bg-indigo-600 rounded-full cursor-pointer"
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
              <span className="flex items-center justify-center w-6 h-6 text-xs text-white bg-indigo-600 rounded-full">
                {chat.new_messages_count}
              </span>
              <TrashIcon
                onClick={() => handleDelete(chat.id)}
                className="w-5 h-5 cursor-pointer"
                aria-hidden="true"
                id="trashIcon"
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
