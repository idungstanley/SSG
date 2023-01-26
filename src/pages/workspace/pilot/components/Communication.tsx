import React, { useState } from 'react';
import { AiOutlineContacts } from 'react-icons/ai';
import { MdDragIndicator, MdOutlineMarkEmailUnread } from 'react-icons/md';
import { RiWechatLine } from 'react-icons/ri';
import { useAppSelector } from '../../../../app/hooks';
import ChatForPilot from '../../../../components/Chat/ChatForPilot';

const communicationOptions = [
  {
    id: 0,
    label: 'email',
    icon: <MdOutlineMarkEmailUnread />,
    element: <ChatForPilot />,
  },
  { id: 1, label: 'chat', icon: <RiWechatLine />, element: <ChatForPilot /> },
  {
    id: 2,
    label: 'contact',
    icon: <AiOutlineContacts />,
    element: <ChatForPilot />,
  },
];
export default function Commnunication() {
  const { showPilot } = useAppSelector((state) => state.workspace);
  const [activeId, setActiveId] = useState<number>(0);
  console.log(activeId);
  const handleActiveId = (id: number) => {
    setActiveId(id);
  };
  return (
    <div className={`flex ${showPilot ? 'flex-row' : 'flex-col'}`}>
      {communicationOptions.map((item) => (
        <section className="flex flex-col w-full" key={item.id}>
          <div>
            <div
              key={item.id}
              onClick={() => handleActiveId(item.id)}
              className="relative flex justify-center flex-grow py-2 font-medium text-gray-500 transition border cursor-pointer group hover:text-gray-700 hover:bg-gray-50 border-y-2"
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
          </div>
          {activeId === item.id && <div className="w-full">{item.element}</div>}
        </section>
      ))}
    </div>
  );
}
