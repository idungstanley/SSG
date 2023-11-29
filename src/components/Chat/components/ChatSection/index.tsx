/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from '../../../../common';
import FullScreenMessage from '../../../CenterMessage/FullScreenMessage';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import Pusher from 'pusher-js';
import { useGetChat } from '../../../../features/chat/chatService';
import ChatsList from '../ChatList';
import MessagesList from './components/MessagesList';
import { setActiveChat } from '../../../../features/chat/chatSlice';
import CreateMessage from './components/CreateMessage';
import { IMessage } from '../../../../features/chat/chat.interfaces';
import TeamMembersInChat from '../TeamMembersInChat';
import ShowIcon from '../../../../assets/icons/ShowIcon';
import ChatFilter from '../../../../assets/icons/ChatFilter';
import ChatAssign from '../../../../assets/icons/ChatAssign';
import ChatMe from '../../../../assets/icons/ChatMe';
import ChatSearch from '../../../../assets/icons/ChatSearch';
import ChatArrowLeft from '../../../../assets/icons/ChatArrowLeft';
import ArrowDrop from '../../../../assets/icons/ArrowDrop';
import { Capitalize } from '../../../../utils/NoCapWords/Capitalize';
import DropdownArrowIcon from '../../../../assets/icons/chatIcons/DropdownArrowIcon';

export default function ChatSection() {
  const dispatch = useAppDispatch();

  const { activeChat } = useAppSelector((state) => state.chat);

  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const socket = useRef<Pusher | null>(null);

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
    dispatch(setActiveChat(''));
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

  useEffect(() => {
    if (activeChat) {
      setSelectedChatId(activeChat);
      connect(activeChat);
    }
  }, [activeChat]);

  const allMessages = messages ? [...messages, ...incomingData] : [...incomingData];

  return (
    <>
      {!selectedChatId ? (
        <ChatsList />
      ) : status === 'loading' ? (
        <div className="justify-center w-6 mx-auto mt-5">
          <Spinner size={8} color="#0F70B7" />
        </div>
      ) : status === 'error' ? (
        <FullScreenMessage title="Oops, an error occurred :(" description="Please try again later." />
      ) : messages && chat ? (
        <div className="grid h-full gap-1 p-2 bg-white grid-rows-autoFrAuto">
          <div style={{ background: '#F4F4F4' }}>
            {/* header */}
            <div className="flex items-center justify-between pb-2 border-b">
              <div className="flex items-center gap-2">
                <p
                  className="py-0.5 relative px-2 rounded-tl-md rounded-br-md flex items-center space-x-1 text-white dFlex"
                  style={{
                    backgroundColor: 'rgb(165, 165, 165)',
                    height: '25px',
                    gap: '5px'
                  }}
                >
                  {Capitalize(chat.name)}
                </p>
                <div
                  onClick={handleDisconnect}
                  className="flex items-center justify-center w-6 h-6 bg-white rounded-md cursor-pointer"
                >
                  <ChatArrowLeft />
                </div>
              </div>

              <div className="flex gap-1">
                <div
                  className="flex justify-between items-center px-1 py-0.5 bg-white items-center rounded-md"
                  style={{ minHeight: '24px', color: 'orange', fontSize: '10px' }}
                >
                  Read By Me
                  <span className="flex items-center pl-1">
                    <label className="switch small" onClick={(event) => event.stopPropagation()}>
                      <input className="inputShow" type="checkbox" checked={false} />
                      <div className="slider" />
                    </label>
                  </span>
                  <DropdownArrowIcon color="orange" />
                </div>
                <div
                  className="flex justify-between items-center px-1 py-0.5 bg-white items-center rounded-md"
                  style={{ minHeight: '24px', color: 'orange', fontSize: '10px' }}
                >
                  Quick Filter
                  <span className="flex items-center pl-1">
                    <DropdownArrowIcon color="orange" />
                  </span>
                </div>
                <div className="flex justify-center bg-white items-center h-6 w-6 rounded-md">
                  <ChatFilter />
                </div>
                <div className="flex justify-center bg-white items-center h-6 w-6 rounded-md">
                  <ShowIcon color="orange" width="21" height="21" />
                </div>
                <div className="flex justify-center bg-alsoit-gray-125 items-center h-6 rounded-md">
                  <div className="relative flex mr-px bg-white justify-center bg-white items-center h-6 w-6 rounded-tl-md rounded-bl-md">
                    <ChatMe />
                    <div
                      className="absolute top-[2px] -right-px rounded-sm bg-alsoit-gray-100"
                      style={{ width: '0.5px', height: 'calc(100% - 4px)' }}
                    />
                  </div>
                  <div className="flex justify-center bg-white items-center h-6 pl-1 rounded-tr-md rounded-br-md">
                    <ChatAssign />
                    <ArrowDrop color="orange" />
                  </div>
                </div>
                <div className="flex justify-center bg-white items-center h-6 w-6 rounded-md mr-2">
                  <ChatSearch />
                </div>
              </div>
            </div>

            <div className="px-2">
              <MessagesList messages={allMessages} />
            </div>

            <CreateMessage chatId={selectedChatId} />
          </div>
        </div>
      ) : null}

      {selectedChatId ? <TeamMembersInChat chatId={selectedChatId} /> : null}
    </>
  );
}
