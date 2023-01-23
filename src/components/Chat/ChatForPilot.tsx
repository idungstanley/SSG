/* eslint-disable no-console */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useGetChat } from '../../features/chat/chatService';
import CreateChatSideOver from './components/CreateChatSideOver';
import Pusher from 'pusher-js';
import { IMessage } from '../../features/chat/chat.interfaces';
import {
  // setShowChat,
  setShowCreateChatSideOver,
  setShowMembersInChatSideOver,
} from '../../features/chat/chatSlice';
import CreateMessage from './components/CreateMessage';
import MessagesList from './components/MessagesList';
import ChatsList from './components/ChatList';
import TeamMembersInChat from './components/TeamMembersInChat';
import {
  PlusIcon,
  ChatBubbleBottomCenterTextIcon,
  UsersIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import ToolTip from '../Tooltip';
import { Spinner } from '../../common';
import FullScreenMessage from '../CenterMessage/FullScreenMessage';

export default function ChatForPilot() {
  const dispatch = useAppDispatch();
  const socket = useRef<Pusher | null>(null);
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const { id } = pilotSideOver;

  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const { data, status } = useGetChat(selectedChatId);

  const chat = data?.chat;
  const messages = data?.messages;

  const [incomingData, setIncomingData] = useState<IMessage[]>([]);

  // disconnect and clear chat id when selectedItem changes
  useEffect(() => {
    if (socket.current?.connection.state === 'connected') {
      handleDisconnect();
    }

    return handleDisconnect;
  }, [id]);

  const handleDisconnect = () => {
    socket.current?.disconnect();
    setSelectedChatId(null);
  };

  const connect = (id: string) => {
    // * show / hide pusher logs
    Pusher.logToConsole = true;

    if (id === selectedChatId) {
      socket.current?.disconnect();
    } else {
      socket.current = new Pusher('alsoworkspace', {
        cluster: `SendMessageExampleEvent-${id}`,
        wsHost: process.env.REACT_APP_WEBSOCKET_HOST,
        wsPort: Number(process.env.REACT_APP_WEBSOCKET_PORT),
        wssPort: Number(process.env.REACT_APP_WEBSOCKET_PORT),
        disableStats: true,
        authEndpoint: '/api/sockets/connect',
        forceTLS: true,
        auth: {
          headers: {
            'X-CSRF-Token': 'iTcXX4EKprDuuxIWtloqmr7yBqRlEjM8C7JydcdB',
            'X-App-ID': 'alsoworkspace',
          },
        },
        enabledTransports: ['ws', 'wss'],
      });

      socket.current.connection.bind('connected', () => {
        console.log('connected');
      });
      socket.current.connection.bind('disconnected', () => {
        console.log('disconnected');
      });
      socket.current.connection.bind('error', (e: unknown) => {
        console.log('error' + String(e));
      });

      const channelName = 'SendMessageEvent-' + id;

      socket.current
        .subscribe(channelName)
        .bind('send-chat-message', (data: { data: { message: IMessage } }) => {
          const message = data.data.message;
          setIncomingData((prev) => [...prev, message]);
        });
    }
  };

  const handleClickChat = (id: string) => {
    setSelectedChatId((prev) => (prev === id ? null : id));
    connect(id);
  };

  // const handleHideChat = () => {
  //   socket.current?.disconnect();
  //   dispatch(setShowChat(false));
  //   setSelectedChatId(null);
  // };

  // old messages with new from websocket
  const allMessages = messages
    ? [...messages, ...incomingData]
    : [...incomingData];

  const navItems = [
    {
      label: 'Chats',
      icon: (
        <ChatBubbleBottomCenterTextIcon
          className="h-7 w-7 stroke-current"
          aria-hidden="true"
        />
      ),
    },
    {
      label: 'Contacts',
      icon: <UsersIcon className="h-7 w-7 stroke-current" aria-hidden="true" />,
    },
  ];

  return (
    <>
      <div className="h-full w-full flex border-r border-l border-b">
        {/* nav */}
        <div className="h-full flex flex-col items-center border-r w-20 p-2 gap-10">
          <ToolTip tooltip="Create chat">
            <button
              onClick={() => dispatch(setShowCreateChatSideOver(true))}
              type="button"
              className="inline-flex text-gray-500 hover:text-gray-700 items-center rounded-full focus:outline-none ring-0 focus:ring-0"
            >
              <PlusIcon className="h-7 w-7" aria-hidden="true" />
            </button>
          </ToolTip>

          <div className="flex flex-col items-center gap-2">
            {navItems.map((item) => (
              <ToolTip key={item.label} tooltip={item.label}>
                <button
                  type="button"
                  className="inline-flex text-gray-500 hover:text-gray-700 items-center p-1 focus:outline-none ring-0 focus:ring-0"
                >
                  {item.icon}
                </button>
              </ToolTip>
            ))}
          </div>
        </div>

        {/* main section */}
        <div className="h-full w-full">
          {!selectedChatId ? (
            <ChatsList selectChat={handleClickChat} />
          ) : status === 'loading' ? (
            <div className="mx-auto w-6 mt-5 justify-center">
              <Spinner size={8} color="#0F70B7" />
            </div>
          ) : status === 'error' ? (
            <FullScreenMessage
              title="Oops, an error occurred :("
              description="Please try again later."
            />
          ) : messages && chat ? (
            <div className="grid grid-rows-autoFrAuto h-full gap-1">
              {/* header */}
              <div className="flex items-center justify-between p-2 border-b">
                <div className="flex items-center gap-2">
                  <ArrowLeftIcon
                    onClick={handleDisconnect}
                    className="h-5 w-5 text-gray-600 cursor-pointer"
                    aria-hidden="true"
                  />
                  <p className="font-semibold text-indigo-600">
                    {chat.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => dispatch(setShowMembersInChatSideOver(true))}
                  className="inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Members
                </button>
              </div>

              <MessagesList messages={allMessages} />

              <CreateMessage chatId={selectedChatId} />
            </div>
          ) : null}
        </div>
      </div>
      {/* <div className="flex h-full pt-2 flex-col overflow-y-scroll">
        {id ? (
          <button
            onClick={() => dispatch(setShowCreateChatSideOver(true))}
            type="button"
            className="px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ring-0 focus:ring-0"
          >
            Create new chat
          </button>
        ) : (
          <div></div>
        )}

        <ChatsList selectChat={handleClickChat} />

        {messages && chat ? (
          <div className="flex flex-col justify-between mt-3">
            <div className="flex items-center justify-between">
              <p className="text-center">
                Chat{' '}
                <span className="font-semibold text-indigo-600">
                  {chat.name}
                </span>
              </p>
              <button
                type="button"
                onClick={() => dispatch(setShowMembersInChatSideOver(true))}
                className="inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Members
              </button>
            </div>
          </div>
        ) : null}

        {selectedChatId ? <MessagesList messages={allMessages} /> : null}

        {selectedChatId ? <CreateMessage chatId={selectedChatId} /> : null}
      </div> */}

      <CreateChatSideOver />

      {selectedChatId ? <TeamMembersInChat chatId={selectedChatId} /> : null}
    </>
  );
}
