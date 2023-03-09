/* eslint-disable no-console */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Spinner } from '../../../../common';
import FullScreenMessage from '../../../CenterMessage/FullScreenMessage';
import { useAppDispatch } from '../../../../app/hooks';
import Pusher from 'pusher-js';
import { useGetChat } from '../../../../features/chat/chatService';
import ChatsList from '../ChatList';
import MessagesList from './components/MessagesList';
import { setShowMembersInChatSideOver } from '../../../../features/chat/chatSlice';
import CreateMessage from './components/CreateMessage';
import { IMessage } from '../../../../features/chat/chat.interfaces';
import TeamMembersInChat from '../TeamMembersInChat';

export default function ChatSection() {
  const dispatch = useAppDispatch();
  const socket = useRef<Pusher | null>(null);

  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const { data, status } = useGetChat(selectedChatId);

  const chat = data?.chat;
  const messages = data?.messages;

  const [incomingData, setIncomingData] = useState<IMessage[]>([]);

  // disconnect and clear chat id on unmount
  useEffect(() => {
    return handleDisconnect;
  }, []);

  const handleDisconnect = () => {
    socket.current?.disconnect();
    setSelectedChatId(null);
  };

  const connect = (id: string) => {
    // * show / hide pusher logs
    // Pusher.logToConsole = true;

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
            'X-App-ID': 'alsoworkspace'
          }
        },
        enabledTransports: ['ws', 'wss']
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

      socket.current.subscribe(channelName).bind('send-chat-message', (data: { data: { message: IMessage } }) => {
        const message = data.data.message;
        setIncomingData((prev) => [...prev, message]);
      });
    }
  };

  const handleClickChat = (id: string) => {
    setSelectedChatId((prev) => (prev === id ? null : id));
    connect(id);
  };

  const allMessages = messages ? [...messages, ...incomingData] : [...incomingData];

  return (
    <>
      {!selectedChatId ? (
        <ChatsList selectChat={handleClickChat} />
      ) : status === 'loading' ? (
        <div className="mx-auto w-6 mt-5 justify-center">
          <Spinner size={8} color="#0F70B7" />
        </div>
      ) : status === 'error' ? (
        <FullScreenMessage title="Oops, an error occurred :(" description="Please try again later." />
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
              <p className="font-semibold text-indigo-600">{chat.name}</p>
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

      {selectedChatId ? <TeamMembersInChat chatId={selectedChatId} /> : null}
    </>
  );
}
