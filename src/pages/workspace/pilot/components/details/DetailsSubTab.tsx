import React from 'react';
import { BiMessageAltDetail } from 'react-icons/bi';
import { MdAddToPhotos, MdDragIndicator } from 'react-icons/md';
import { useAppSelector } from '../../../../../app/hooks';

interface SubTabProps {
  activeSubTabId: number;
  setActiveSubTabId: (i: number) => void;
}
const DetailOptions = [
  {
    id: 0,
    label: 'details',
    icon: <BiMessageAltDetail />,
    // element: <SubDetails />,
  },
  {
    id: 1,
    label: 'addTo',
    icon: <MdAddToPhotos />,
  },
];
export default function DetailsSubTab({activeSubTabId, setActiveSubTabId}: SubTabProps) {
  const { showPilot } = useAppSelector((state) => state.workspace);
  return (
    <section>
      <div
        className={`flex bg-gray-400 pt-0.5 ${
          showPilot ? 'flex-row' : 'flex-col'
        }`}
      >
        {DetailOptions.map((item) => (
          <section
            className={`flex flex-col w-full bg-white ${
              item.id === activeSubTabId ? 'rounded-t-lg bg-white' : ''
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
    </section>
  );
}
