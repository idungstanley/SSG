import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { useDeleteChat, useGetChats } from '../../../features/chat/chatService';
import FullScreenMessage from '../../CenterMessage/FullScreenMessage';
import { TrashIcon } from '@heroicons/react/24/outline';

interface ChatsListProps {
  selectChat: (i: string) => void;
}

export default function ChatsList({ selectChat }: ChatsListProps) {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const { id, type } = pilotSideOver;

  const { mutate: onDelete } = useDeleteChat();

  const { data } = useGetChats({
    type,
    id,
  });

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  return !pilotSideOver ? (
    <FullScreenMessage
      title="No selected data."
      description="Select one file, folder, etc."
    />
  ) : !data?.length ? (
    <FullScreenMessage title="No chats." description="Create one." />
  ) : (
    <ul role="list" className="divide-y divide-gray-200 flex flex-wrap gap-3">
      {data?.map((chat) => (
        <li
          key={chat.id}
          className="inline-flex gap-3 items-center rounded-full bg-indigo-100 px-3 font-medium text-indigo-800 cursor-pointer"
        >
          <div
            onClick={() => selectChat(chat.id)}
            className="flex gap-3 items-center py-2"
          >
            <p className="text-sm">{chat.name}</p>
            <span className="flex bg-indigo-600 text-xs text-white w-6 h-6 justify-center items-center rounded-full">
              {chat.new_messages_count}
            </span>
          </div>

          <TrashIcon
            onClick={() => handleDelete(chat.id)}
            className="h-5 w-5 cursor-pointer"
            aria-hidden="true"
            id="trashIcon"
          />
        </li>
      ))}
    </ul>
  );
}
