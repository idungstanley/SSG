/* eslint-disable no-console */
import React, { Fragment, useRef, useState } from 'react';
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
import { setShowChat } from '../../features/chat/chatSlice';
import Badge from './components/Badge';
import CreateMessage from './components/CreateMessage';
import MessagesList from './components/MessagesList';
import ChatsList from './components/ChatList';

export default function Chat() {
  const dispatch = useAppDispatch();
  const [showSideOver, setShowSideOver] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const { showChat } = useAppSelector((state) => state.chat);

  const [message, setMessage] = useState('');

  const { data } = useGetChat(selectedChatId);

  const { mutate: onSendMessage } = useSendMessageToChat();

  const socket = useRef<Pusher | null>(null);

  const chat = data?.chat;
  const messages = data?.messages;

  const [incomingData, setIncomingData] = useState<IMessage[]>([]);

  const connect = (id: string) => {
    Pusher.logToConsole = true;

    if (id === selectedChatId) {
      socket.current?.disconnect();
    } else {
      socket.current = new Pusher('alsoworkspace', {
        cluster: `SendMessageExampleEvent-${id}`,
        wsHost: 'socket.alsoworkspace.com',
        wsPort: 443,
        wssPort: 443,
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
          // console.log(data.data.message);
          const message = data.data.message;
          setIncomingData((prev) => [...prev, message]);
        });

      // channel1.bind('message', function (data: unknown) {
      //   console.log(data);
      //   // Code that runs when channel1 listens to a new message
      // });
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
  };

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
        <div className="p-4 flex flex-col gap-4 w-80 h-3/4 border-l">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowSideOver(true)}
              type="button"
              className="px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ring-0 focus:ring-0"
            >
              Create new chat
            </button>

            <XIcon
              onClick={handleHideChat}
              className="h-6 w-6 cursor-pointer"
              aria-hidden="true"
            />
          </div>

          <ChatsList selectChat={handleClickChat} />

          {messages && chat ? (
            <div className="h-full">
              <p className="text-center mb-4">
                Chat{' '}
                <span className="font-semibold text-indigo-600">
                  {chat.name}
                </span>
              </p>
              <div className="flex flex-col h-full justify-between">
                <MessagesList messages={allMessages} />

                <CreateMessage
                  message={message}
                  setMessage={setMessage}
                  sendMessage={sendMessage}
                />
              </div>
            </div>
          ) : null}
        </div>
      </Transition.Root>

      <Badge />

      <CreateChatSideOver
        showSideOver={showSideOver}
        setShowSideOver={setShowSideOver}
      />
    </>
  );
}
