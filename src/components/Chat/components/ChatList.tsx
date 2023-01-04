import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { useGetChats } from '../../../features/chat/chatService';
import FullScreenMessage from '../../CenterMessage/FullScreenMessage';

interface ChatsListProps {
  selectChat: (i: string) => void;
}

export default function ChatsList({ selectChat }: ChatsListProps) {
  const { selectedItemId, selectedItemType } = useAppSelector(
    (state) => state.explorer
  );

  const { data } = useGetChats({ type: selectedItemType, id: selectedItemId });

  return !data?.length ? (
    <FullScreenMessage
      title="No selected data."
      description="Select one file, folder, etc."
      showHalFScreen
    />
  ) : (
    <ul role="list" className="divide-y divide-gray-200 flex flex-wrap">
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
        </li>
      ))}
    </ul>
  );
}
