import React, { useRef, useState } from 'react';
import Input from '../input/Input';
import { SearchIcon } from '@heroicons/react/outline';
import { useAppSelector } from '../../app/hooks';
import { useGetChat, useGetChats } from '../../features/chat/chatService';
import CreateChatSideOver from './components/CreateChatSideOver';
import FullScreenMessage from '../CenterMessage/FullScreenMessage';
import AvatarWithInitials from '../avatar/AvatarWithInitials';

const BarsIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 stroke-current text-gray-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
    />
  </svg>
);

export default function Chat() {
  const [searchValue, setSearchValue] = useState('');
  const [showSideOver, setShowSideOver] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const { selectedItemId, selectedItemType } = useAppSelector(
    (state) => state.explorer
  );

  const { data } = useGetChats({ type: selectedItemType, id: selectedItemId });

  const { data: dt } = useGetChat(selectedChatId);

  const chat = dt?.chat;
  const messages = dt?.messages;

  // const [isConnectionOpen, setConnectionOpen] = useState(false);
  // const ws = useRef<WebSocket | null>(null);

  // const connect = (id: string) => {
  //   ws.current = new WebSocket(
  //     'wss://socket.alsoworkspace.com/app/alsoworkspace'
  //   );

  //   ws.current.onopen = () => {
  //     setConnectionOpen(true);
  //     ws.current?.send(
  //       JSON.stringify({
  //         command: 'subscribe',
  //         identifier: `{"channel":"SendMessageEvent-${id}"}`,
  //       })
  //     );
  //     console.log('opened');
  //   };

  //   ws.current.onmessage = (e: MessageEvent<any>) => {
  //     const message = JSON.parse(e.data);
  //     console.log({ message });
  //   };

  //   ws.current.onclose = () => {
  //     setConnectionOpen(false);
  //     console.log('closed');
  //   };

  //   ws.current.onerror = () => {
  //     console.log('error');
  //   };
  // };

  const handleClick = (id: string) => {
    setSelectedChatId((prev) => (prev === id ? null : id));
    // connect(id);
  };

  // const sendMessage = () => {
  //   ws.current?.send(
  //     JSON.stringify({
  //       command: 'subscribe',
  //       identifier: `{"channel":"SendMessageEvent-${selectedChatId}"}`,
  //     })
  //   );
  // };

  return (
    <>
      <div className="p-4 flex flex-col gap-4 w-80 h-full border-l">
        <button
          onClick={() => setShowSideOver(true)}
          type="button"
          className="px-3.5 py-2 border border-transparent w-full mb-4 text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ring-0 focus:ring-0"
        >
          Create new chat
        </button>
        <Input
          leadingIcon={
            <SearchIcon className="w-5 h-5 stroke-current text-gray-600" />
          }
          trailingIcon={BarsIcon}
          name="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Enter search value..."
        />
        {!data?.length ? (
          <FullScreenMessage
            title="No chats yet."
            description="Create one."
            showHalFScreen
          />
        ) : (
          <ul role="list" className="divide-y divide-gray-200">
            {data?.map((chat) => (
              <li
                onClick={() => handleClick(chat.id)}
                key={chat.id}
                className="flex group py-4 cursor-pointer"
              >
                <div className="flex justify-between items-center w-full">
                  <p className="text-sm group-hover:text-gray-900 font-medium text-gray-700">
                    {chat.name}
                  </p>

                  <p className="text-xs group-hover:text-gray-700 text-gray-500">
                    {chat.new_messages_count}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {messages && chat ? (
          <div>
            <p>
              Chat{' '}
              <span className="font-semibold text-indigo-600">{chat.name}</span>
            </p>
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div className="flex gap-3 items-center" key={message.id}>
                  <AvatarWithInitials
                    initials={message.team_member.initials}
                    backgroundColour={message.team_member.colour}
                  />
                  <div className="flex flex-col justify-start gap-1 p-2 rounded-xl border">
                    <p className="text-sm text-gray-600">
                      {message.team_member.user.name}
                    </p>
                    <p className="text-gray-600">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <CreateChatSideOver
        showSideOver={showSideOver}
        setShowSideOver={setShowSideOver}
      />
    </>
  );
}

// const [messages, setMessages] = useState<{ sender: string; body: string }[]>(
//   []
// );
// const [isConnectionOpen, setConnectionOpen] = useState(false);
// const [messageBody, setMessageBody] = useState('test');

// const ws = useRef<WebSocket | null>(null);

// const sendMessage = () => {
//   if (messageBody) {
//     if (ws.current) {
//       ws.current.send(
//         JSON.stringify({
//           sender: 'username',
//           body: messageBody,
//         })
//       );
//     }
//     setMessageBody('');
//   }
// };

// React.useEffect(() => {
//   ws.current = new WebSocket(
//     'wss://socket.alsoworkspace.com/app/alsoworkspace'
//   );

//   // Opening the ws connection

//   ws.current.onopen = () => {
//     console.log('Connection opened');
//     setConnectionOpen(true);
//   };

//   ws.current.onmessage = (event) => {
//     const data = JSON.parse(event.data);
//     setMessages((_messages) => [..._messages, data]);
//   };

//   return () => {
//     console.log('Cleaning up...');
//     ws.current?.close();
//   };
// }, []);
