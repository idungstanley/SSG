import React from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import { MdDragIndicator } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import inandoutIcon from '../../../../../../assets/branding/clock-in-and-out.png';
import clockLogsIcon from '../../../../../../assets/branding/clock-logs.png';
import clockPreferenceIcon from '../../../../../../assets/branding/clock-preferences.png';
import { setActiveSubTimeClockTabId } from '../../../../../../features/workspace/workspaceSlice';

const TimeClockOptions = [
  {
    id: 0,
    name: 'In & Out',
    source: inandoutIcon,
  },
  {
    id: 1,
    label: 'Clock Logs',
    source: clockLogsIcon,
  },
  {
    id: 2,
    label: 'Clock Preference',
    source: clockPreferenceIcon,
  },
];
export default function TimeSubTab() {
  const { showPilot, activeSubTimeClockTabId } = useAppSelector(
    (state) => state.workspace
  );
  const dispatch = useDispatch();
  return (
    <section>
      <div
        className={`flex bg-gray-400 pt-0.5 ${
          showPilot ? 'flex-row' : 'flex-col'
        }`}
      >
        {TimeClockOptions.map((item) => (
          <section
            className={`flex flex-col w-full bg-white ${
              item.id === activeSubTimeClockTabId && showPilot
                ? 'rounded-t-lg bg-white'
                : ''
            }`}
            key={item.id}
          >
            <div
              key={item.id}
              onClick={() => dispatch(setActiveSubTimeClockTabId(item.id))}
              className={`relative flex justify-center flex-grow py-2 font-medium text-gray-500 transition cursor-pointer group hover:text-gray-700 border-y-2 ${
                item.id === activeSubTimeClockTabId &&
                showPilot &&
                'rounded-t-lg bg-white'
              } ${
                item.id != activeSubTimeClockTabId &&
                showPilot &&
                'rounded-b-lg bg-gray-400'
              }`}
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
                  item.id === activeSubTimeClockTabId &&
                  !showPilot &&
                  'bg-green-500 p-2 rounded'
                }`}
              >
                {<img src={item.source} alt="Hub Icon" className="w-3 h-3" />}
              </span>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
