import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { useDeleteChat, useGetChats } from '../../../features/chat/chatService';
import FullScreenMessage from '../../CenterMessage/FullScreenMessage';
import { TrashIcon } from '@heroicons/react/outline';
import { useQueryClient } from '@tanstack/react-query';

interface ChatsListProps {
  selectChat: (i: string) => void;
}

export default function ChatsList({ selectChat }: ChatsListProps) {
  const queryClient = useQueryClient();

  const { selectedItemId, selectedItemType } = useAppSelector(
    (state) => state.explorer
  );

  const { mutate: onDelete } = useDeleteChat();

  const { data } = useGetChats({
    type: selectedItemType,
    id: selectedItemId,
  });

  const handleDelete = (id: string) => {
    onDelete(id);
    queryClient.invalidateQueries(['chats', id]);
  };

  return !selectedItemId ? (
    <FullScreenMessage
      title="No selected data."
      description="Select one file, folder, etc."
      showHalFScreen
    />
  ) : !data?.length ? (
    <FullScreenMessage
      title="No chats."
      description="Create one."
      showHalFScreen
    />
  ) : (
    <ul role="list" className="divide-y divide-gray-200 flex flex-wrap gap-3">
      {data?.map((chat) => (
        <li
          onClick={() => selectChat(chat.id)}
          key={chat.id}
          className="inline-flex gap-3 items-center rounded-full bg-indigo-100 px-3 py-2 text-xs font-medium text-indigo-800 cursor-pointer"
        >
          {chat.name}
          <span className="flex bg-indigo-600 text-white w-6 h-6 justify-center items-center rounded-full">
            {chat.new_messages_count}
          </span>
          <TrashIcon
            onClick={() => handleDelete(chat.id)}
            className="h-5 w-5 cursor-pointer"
            aria-hidden="true"
          />
        </li>
      ))}
    </ul>
  );
}
