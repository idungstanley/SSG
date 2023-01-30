import React from 'react';
import { AiOutlineContacts } from 'react-icons/ai';
import { MdDragIndicator, MdOutlineMarkEmailUnread } from 'react-icons/md';
import { RiWechatLine } from 'react-icons/ri';
import { useAppSelector } from '../../../../../app/hooks';

interface SubTabProps {
  activeSubTabId: number;
  setActiveSubTabId: (i: number) => void;
}
const communicationOptions = [
  {
    id: 0,
    label: 'email',
    icon: <MdOutlineMarkEmailUnread />,
  },
  { id: 1, label: 'chat', icon: <RiWechatLine /> },
  {
    id: 2,
    label: 'contact',
    icon: <AiOutlineContacts />,
  },
];
export default function CommunicationSubTab({
  activeSubTabId,
  setActiveSubTabId,
}: SubTabProps) {
  const { showPilot } = useAppSelector((state) => state.workspace);
  return (
    <div
      className={`flex bg-gray-400 pt-0.5 ${
        showPilot ? 'flex-row' : 'flex-col'
      }`}
    >
      {communicationOptions.map((item) => (
        <section
          className={`flex flex-col w-full bg-white ${
            item.id === activeSubTabId
              ? 'rounded-t-lg bg-white'
              : ''
          }`}
          key={item.id}
        >
          <div
            key={item.id}
            onClick={() => setActiveSubTabId(item.id)}
            className={`relative flex justify-center flex-grow py-2 font-medium text-gray-500 transition cursor-pointer group hover:text-gray-700 border-y-2 ${
              item.id === activeSubTabId
                ? 'rounded-t-lg bg-white'
                : 'rounded-b-lg bg-gray-400'
            }`}
          >
            <span
              className={`absolute left-2 text-gray-500 justify-center text-xl cursor-move opacity-0 group-hover:opacity-100 ${
                showPilot ? 'block' : 'hidden'
              }`}
            >
              <MdDragIndicator />
            </span>
            <span>{item.icon}</span>
          </div>
        </section>
      ))}
    </div>
  );
}
