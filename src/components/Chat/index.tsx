/* eslint-disable no-console */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { XIcon } from '@heroicons/react/outline';
import {
  useGetChat,
  useSendMessageToChat,
} from '../../features/chat/chatService';
import CreateChatSideOver from './components/CreateChatSideOver';
import Pusher from 'pusher-js';
import { IMessage } from '../../features/chat/chat.interfaces';
import { Transition } from '@headlessui/react';
import {
  setShowChat,
  setShowCreateChatSideOver,
  setShowMembersInChatSideOver,
} from '../../features/chat/chatSlice';
import Badge from './components/Badge';
import CreateMessage from './components/CreateMessage';
import MessagesList from './components/MessagesList';
import ChatsList from './components/ChatList';
import TeamMembersInChat from './components/TeamMembersInChat';

export default function Chat() {
  const dispatch = useAppDispatch();
  const socket = useRef<Pusher | null>(null);
  const { selectedItemId } = useAppSelector((state) => state.explorer);
  const { showChat } = useAppSelector((state) => state.chat);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const { data } = useGetChat(selectedChatId);

  const chat = data?.chat;
  const messages = data?.messages;

  const [incomingData, setIncomingData] = useState<IMessage[]>([]);
  const [message, setMessage] = useState('');

  const { mutate: onSendMessage } = useSendMessageToChat();

  // disconnect and clear chat id when selectedItem changes
  useEffect(() => {
    if (socket.current?.connection.state === 'connected') {
      socket.current?.disconnect();
      setSelectedChatId(null);
    }
  }, [selectedItemId]);

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

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSendMessage({
      message,
      chatId: selectedChatId,
    });
    setMessage('');
  };

  const handleHideChat = () => {
    socket.current?.disconnect();
    dispatch(setShowChat(false));
    setSelectedChatId(null);
  };

  // old messages with new from websocket
  const allMessages = messages
    ? [...messages, ...incomingData]
    : [...incomingData];

  return (
    <>
      <Transition.Root
        show={showChat}
        as={Fragment}
        enter="transform transition ease-in-out duration-500 sm:duration-700"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500 sm:duration-700"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="p-4 flex flex-col gap-4 w-96 h-full border-l">
          {/* header */}
          <div className="flex justify-between items-center">
            {selectedItemId ? (
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

            <XIcon
              onClick={handleHideChat}
              className="h-6 w-6 cursor-pointer"
              aria-hidden="true"
            />
          </div>

          <ChatsList selectChat={handleClickChat} />

          {messages && chat ? (
            <div className="h-2/3 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
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

              <MessagesList messages={allMessages} />

              <CreateMessage
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}
              />
            </div>
          ) : null}
        </div>
      </Transition.Root>

      <Badge />

      {selectedChatId ? <TeamMembersInChat chatId={selectedChatId} /> : null}

      <CreateChatSideOver />
    </>
  );
}
