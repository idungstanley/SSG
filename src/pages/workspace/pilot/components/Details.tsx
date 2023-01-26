import React, { useState } from 'react';
import { AiOutlineContacts, AiTwotoneEye } from 'react-icons/ai';
import { BiMessageAltDetail } from 'react-icons/bi';
import {
  MdAddToPhotos,
  MdDragIndicator,
} from 'react-icons/md';
import { useAppSelector } from '../../../../app/hooks';

const DetailOptions = [
  { id: 0, label: 'details', icon: <BiMessageAltDetail /> },
  { id: 1, label: 'addTo', icon: <MdAddToPhotos /> },
  { id: 2, label: 'watcher', icon: <AiTwotoneEye /> },
];
export default function Details() {
  const { showPilot } = useAppSelector((state) => state.workspace);
   const [activeId, setActiveId] = useState<number>(0);
   console.log(activeId);
   const handleActiveId = (id: number) => {
     setActiveId(id);
   };
  return (
    <div className={`flex ${showPilot ? 'flex-row' : 'flex-col'}`}>
      {DetailOptions.map((item) => (
        <div
          key={item.id}
          className="relative flex justify-center flex-grow py-2 font-medium text-gray-500 transition border cursor-pointer group hover:text-gray-700 hover:bg-gray-50 border-y-2"
          onClick={() => handleActiveId(item.id)}
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
      ))}
    </div>
  );
}
