import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useDeleteChat, useGetChats } from '../../../features/chat/chatService';
import FullScreenMessage from '../../CenterMessage/FullScreenMessage';
import { PlusIcon, UsersIcon } from '@heroicons/react/24/outline';
import { Spinner } from '../../../common';
import { CiSearch } from 'react-icons/ci';
import { CgSortAz } from 'react-icons/cg';
import { AiOutlinePlus } from 'react-icons/ai';
import ToolTip from '../../Tooltip/Tooltip';
import { setShowCreateChatSideOver } from '../../../features/chat/chatSlice';

interface ChatsListProps {
  selectChat: (i: string) => void;
}

export default function ChatsList({ selectChat }: ChatsListProps) {
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const { type, id } = pilotSideOver;
  const dispatch = useAppDispatch();

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
      <div className="flex justify-between items-center ">
        <h2 className="p-2 text-lg font-medium text-gray-900 border-b">Edit</h2>
        <p className="flex justify-between items-center mr-4 gap-2">
          <CiSearch className="h-5 w-5" aria-hidden="true" />
          <CgSortAz className="h-5 w-5" aria-hidden="true" />
          <ToolTip tooltip="Create chat">
            <button
              onClick={() => dispatch(setShowCreateChatSideOver(true))}
              type="button"
              className="inline-flex text-gray-500 hover:text-gray-700 items-center rounded-full focus:outline-none ring-0 focus:ring-0"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </ToolTip>
        </p>
      </div>
      <ul role="list" className="flex flex-wrap divide-y divide-gray-200">
        {data?.map((chat) => (
          <li
            key={chat.id}
            className="grid items-center justify-between w-full p-2 grid-cols-sidebarItem hover:bg-gray-100 "
          >
            {/* avatar */}
            <span
              onClick={() => selectChat(chat.id)}
              className="flex items-center justify-center w-9 h-9 p-1 pb-1 text-md font-medium text-white uppercase bg-indigo-600 rounded-full cursor-pointer"
            >
              {chat.name.slice(0, 2)}
            </span>

            {/* chat name and last message */}
            <div onClick={() => selectChat(chat.id)} className="ml-3 cursor-pointer">
              <p className="font-medium text-gray-900">{chat.name}</p>
              <p className="text-sm text-gray-500">message</p>
            </div>

            {/* action buttons */}
            <div className="flex flex-col items-center gap-2">
              <span className="flex items-center justify-center min-w-full h-3 text-xs text-white bg-indigo-600 rounded-full">
                {chat.new_messages_count}
              </span>
              <span>
                <UsersIcon className="h-4 w-4 stroke-current" aria-hidden="true" />
              </span>
              {/* <TrashIcon
                onClick={() => handleDelete(chat.id)}
                className="w-5 h-5 cursor-pointer"
                aria-hidden="true"
                id="trashIcon"
              /> */}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
