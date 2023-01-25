import React from 'react';
import { AiOutlineContacts } from 'react-icons/ai';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { RiWechatLine } from 'react-icons/ri';

const communicationOptions = [
  { id: 0, label: 'email', icon: <MdOutlineMarkEmailUnread /> },
  { id: 1, label: 'chat', icon: <RiWechatLine /> },
  { id: 2, label: 'contact', icon: <AiOutlineContacts /> },
];
export default function Commnunication() {
  return (
    <div className="flex">
      {communicationOptions.map((item) => (
        <div
          key={item.id}
          className="flex justify-center flex-grow py-2 font-medium text-gray-500 transition border cursor-pointer hover:text-gray-700 hover:bg-gray-50 border-y-2"
        >
          <span>{item.icon}</span>
        </div>
      ))}
    </div>
  );
}
