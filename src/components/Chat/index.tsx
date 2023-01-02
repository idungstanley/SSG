import React, { useState } from 'react';
import Input from '../input/Input';
import { SearchIcon } from '@heroicons/react/outline';

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

const people = [
  {
    name: 'Calvin Hawkins',
    email: 'calvin.hawkins@example.com',
    image:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    time: '11.21AM',
  },
  {
    name: 'Kristen Ramos',
    time: '11.61AM',
    email: 'kristen.ramos@example.com',
    image:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Ted Fox',
    time: '11.31AM',
    email: 'ted.fox@example.com',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export default function Chat() {
  const [searchValue, setSearchValue] = useState('');
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

  return (
    <div className="p-4 flex flex-col gap-4 w-80 h-full justify-between">
      <div>
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
        <ul role="list" className="divide-y divide-gray-200">
          {people.map((person) => (
            <li
              key={person.email}
              className="flex py-4 cursor-pointer hover:bg-gray-100"
            >
              <img
                className="h-10 w-10 rounded-full"
                src={person.image}
                alt=""
              />
              <div className="flex justify-between items-start w-full">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {person.name}
                  </p>
                  <p className="text-sm text-gray-500">{person.email}</p>
                </div>
                <p className="text-xs text-gray-500">{person.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button
        // onClick={sendMessage}
        type="button"
        className="px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none ring-0 focus:ring-0"
      >
        Create new chat
      </button>
    </div>
  );
}
