import React, { useMemo } from 'react';
import { MdDragIndicator, MdOutlineMoreTime } from 'react-icons/md';
import { useDispatch } from 'react-redux';
// import { setActiveSubTimeClockTabId } from '../../../../../../../../features/workspace/workspaceSlice';
import { RiTimerFlashLine } from 'react-icons/ri';
import { FaBusinessTime } from 'react-icons/fa';
import { useAppSelector } from '../../../../app/hooks';
import { setActiveSubRecordTabId } from '../../../../features/workspace/workspaceSlice';
import Recording from './Recording';
import VideoEntries from './RecordingLogs';

export const ScreenRecordTabs = [
  {
    id: 0,
    name: 'Recorder',
    icon: <RiTimerFlashLine />,
    isVisible: false
  },
  {
    id: 1,
    name: 'Video Logs',
    icon: <FaBusinessTime />,
    isVisible: false
  },
  {
    id: 2,
    name: 'Video Preference',
    icon: <MdOutlineMoreTime />,
    isVisible: false
  }
];

const videoOptions = [
  { id: 0, element: <Recording /> },
  {
    id: 1,
    element: <VideoEntries />
  },
  {
    id: 2,
    element: ''
  }
];

export default function RecordScreen() {
  const { showPilot, activeSubRecordsTabId } = useAppSelector((state) => state.workspace);
  const dispatch = useDispatch();

  const VideotabsView = useMemo(
    () => videoOptions.find((el) => el.id === activeSubRecordsTabId),
    [activeSubRecordsTabId]
  );
  return (
    // <div>
    //   <Recording />
    // </div>
    <section>
      <div className={`flex bg-gray-400 pt-0.5 ${showPilot ? 'flex-row' : 'flex-col'}`}>
        {ScreenRecordTabs.map((item) => (
          <section
            className={`flex flex-col w-full bg-white ${
              item.id === activeSubRecordsTabId && showPilot ? 'rounded-t-lg bg-white' : ''
            }`}
            key={item.id}
          >
            <div
              key={item.id}
              onClick={() => dispatch(setActiveSubRecordTabId(item.id))}
              className={`relative flex justify-center flex-grow py-2 font-medium text-gray-500 transition cursor-pointer group hover:text-gray-700 border-y-2 ${
                item.id === activeSubRecordsTabId && showPilot && 'rounded-t-lg bg-white'
              } ${item.id != activeSubRecordsTabId && showPilot && 'rounded-b-lg bg-gray-400'}`}
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
                  item.id === activeSubRecordsTabId && !showPilot && 'bg-green-500 p-2 rounded w-3 h-3'
                }`}
              >
                {item.icon}
              </span>
            </div>
          </section>
        ))}
      </div>
      {showPilot && VideotabsView?.element}
    </section>
  );
}
