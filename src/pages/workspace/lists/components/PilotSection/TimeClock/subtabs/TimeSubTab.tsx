import React from 'react';
import { useAppSelector } from '../../../../../../../app/hooks';
import { MdDragIndicator, MdOutlineMoreTime } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { setActiveSubTimeClockTabId } from '../../../../../../../features/workspace/workspaceSlice';
import { RiTimerFlashLine } from 'react-icons/ri';
import { FaBusinessTime } from 'react-icons/fa';

export const TimeClockOptions = [
  {
    id: 0,
    name: 'In & Out',
    icon: <RiTimerFlashLine />,
    isVisible: false
  },
  {
    id: 1,
    name: 'Manual Time Add',
    icon: <FaBusinessTime />,
    isVisible: false
  },
  {
    id: 2,
    name: 'Clock Preference',
    icon: <MdOutlineMoreTime />,
    isVisible: false
  }
];
export default function TimeSubTab() {
  const { showPilot, activeSubTimeClockTabId } = useAppSelector((state) => state.workspace);
  const dispatch = useDispatch();
  return (
    <section>
      <div className={`flex bg-gray-400 pt-0.5 ${showPilot ? 'flex-row' : 'flex-col'}`}>
        {TimeClockOptions.map((item) => (
          <section
            className={`flex flex-col w-full bg-white ${
              item.id === activeSubTimeClockTabId && showPilot ? 'rounded-t-lg bg-white' : ''
            }`}
            key={item.id}
          >
            <div
              key={item.id}
              onClick={() => dispatch(setActiveSubTimeClockTabId(item.id))}
              className={`relative flex justify-center flex-grow py-2 font-medium text-gray-500 transition cursor-pointer group hover:text-gray-700 border-y-2 ${
                item.id === activeSubTimeClockTabId && showPilot && 'rounded-t-lg bg-white'
              } ${item.id != activeSubTimeClockTabId && showPilot && 'rounded-b-lg bg-gray-400'}`}
            >
              <span
                className={`absolute left-2 text-gray-500 justify-center text-xl cursor-move opacity-0 group-hover:opacity-100 ${
                  showPilot ? 'block' : 'hidden'
                }`}
              >
                <MdDragIndicator />
              </span>
              <span
                className={`${!showPilot && 'text-xs'} ${
                  item.id === activeSubTimeClockTabId && !showPilot && 'bg-green-500 p-2 rounded w-3 h-3'
                }`}
              >
                {item.icon}
              </span>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
