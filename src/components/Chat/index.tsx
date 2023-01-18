/* eslint-disable no-console */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { XIcon } from '@heroicons/react/outline';
import { useGetChat } from '../../features/chat/chatService';
import CreateChatSideOver from './components/CreateChatSideOver';
import Pusher from 'pusher-js';
import { IMessage } from '../../features/chat/chat.interfaces';
import { Dialog, Transition } from '@headlessui/react';
import {
  setShowChat,
  setShowCreateChatSideOver,
  setShowMembersInChatSideOver,
} from '../../features/chat/chatSlice';
import CreateMessage from './components/CreateMessage';
import MessagesList from './components/MessagesList';
import ChatsList from './components/ChatList';
import TeamMembersInChat from './components/TeamMembersInChat';

export default function Chat() {
  const dispatch = useAppDispatch();
  const socket = useRef<Pusher | null>(null);
  const { showChat, selectedItem } = useAppSelector((state) => state.chat);

  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const { data } = useGetChat(selectedChatId);

  const chat = data?.chat;
  const messages = data?.messages;

  const [incomingData, setIncomingData] = useState<IMessage[]>([]);

  // disconnect and clear chat id when selectedItem changes
  useEffect(() => {
    if (socket.current?.connection.state === 'connected') {
      socket.current?.disconnect();
      setSelectedChatId(null);
    }
  }, [selectedItem?.id]);

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
      <Transition.Root show={showChat} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleHideChat}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 top-14 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md h-full">
                    {/* header */}
                    <div className="flex h-full p-2 flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex justify-between items-center mb-3">
                        {selectedItem?.id ? (
                          <button
                            onClick={() =>
                              dispatch(setShowCreateChatSideOver(true))
                            }
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
                              onClick={() =>
                                dispatch(setShowMembersInChatSideOver(true))
                              }
                              className="inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Members
                            </button>
                          </div>
                        </div>
                      ) : null}

                      {selectedChatId ? (
                        <MessagesList messages={allMessages} />
                      ) : null}

                      {selectedChatId ? (
                        <CreateMessage chatId={selectedChatId} />
                      ) : null}
                    </div>

                    {/* </div> */}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>

          <CreateChatSideOver />

          {selectedChatId ? (
            <TeamMembersInChat chatId={selectedChatId} />
          ) : null}
        </Dialog>
      </Transition.Root>
    </>
  );
}
