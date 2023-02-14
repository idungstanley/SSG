import React, { useState } from 'react';
import { AvatarWithInitials } from '../../../../components';
import { BsStopCircle } from 'react-icons/bs';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { CurrencyDollarIcon, TagIcon } from '@heroicons/react/24/outline';
import {
  GetTimeEntriesService,
  StartTimeEntryService,
} from '../../../../features/task/taskService';
import { useAppSelector } from '../../../../app/hooks';
import moment from 'moment';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import EntryList from './entryLists/EntryList';

export default function TimeEntries() {
  const [showEntries, setShowEntries] = useState(false);
  const { currentTaskIdForPilot } = useAppSelector((state) => state.task);
  const { activeItemName, activeItemType } = useAppSelector(
    (state) => state.workspace
  );
  const [startTimeClicked, setStartTimeClicked] = useState(false);
  const [stopTimeClock, setStopTimeClock] = useState(false);

  const { data: getEntries, refetch } = GetTimeEntriesService({
    taskId: currentTaskIdForPilot,
    trigger: activeItemType,
  });

  StartTimeEntryService({
    taskId: currentTaskIdForPilot,
    trigger: startTimeClicked,
  });

  // EndTimeEntriesService({
  //   taskId: currentTaskIdForPilot,
  //   trigger: stopTimeClock,
  // });

  const handleTimeTrigger = () => {
    setStartTimeClicked(!startTimeClicked);
    if (startTimeClicked) {
      setStopTimeClock(!stopTimeClock);
    }
  };

  const handleShowEntries = () => {
    setShowEntries(!showEntries);
    refetch();
  };
  const totalDuration = getEntries?.data.total_duration;
  return (
    <div className="mt-6 p-2 rounded-t-md">
      <div className="bg-gray-100">
        <section className="">
          <div
            id="lastUpdatedTask"
            className="flex justify-between items-center text-xs font-normal h-7 mb-3 py-1 px-3"
          >
            <h4>{activeItemName}</h4>
          </div>
          <div
            id="taskUser"
            className="flex justify-between items-center text-xs font-normal h-10 py-3 px-3 hover:bg-gray-200 cursor-pointer"
            onClick={() => handleShowEntries()}
          >
            <div className="p-2 flex items-center justify-start space-x-1 cursor-pointer">
              <AvatarWithInitials height="h-7" width="w-7" initials="AU" />
            </div>
            {/* total time here */}
            <p>{moment.utc(totalDuration * 1000).format('HH:mm:ss')}</p>
          </div>
          {/* render time enteries */}
          {showEntries &&
            getEntries?.data?.time_entries?.map((entries: entriesProps) => (
              <EntryList entries={entries} key={entries.id} />
            ))}
        </section>
        <section
          id="body"
          className="bg-indigo-500 text-white rounded-b-md px-3 py-1"
        >
          <div id="descNote" className="text-white w-full my-3">
            <input
              type="text"
              name="description"
              // onChange={handleEndTimeChange}
              placeholder="Enter a note"
              className="border-0 shadow-sm rounded text-gray-600 w-full"
            />
          </div>
          <div
            id="entries"
            className="px-3 py-1 flex items-center justify-between"
          >
            <div
              id="left"
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => handleTimeTrigger()}
            >
              {startTimeClicked ? (
                <BsStopCircle
                  className="text-red-400 cursor-pointer text-2xl"
                  aria-hidden="true"
                />
              ) : (
                <AiOutlinePlayCircle
                  className="text-green-500 cursor-pointer text-2xl"
                  aria-hidden="true"
                />
              )}
              <Timer
                active={startTimeClicked}
                duration={null}
                // onStop={HandleStopTimer}
              >
                <Timecode />
              </Timer>
            </div>
            <div id="right" className="flex items-center space-x-1">
              <span className="border-dotted border-white border-2 rounded-full p-1 ml-1 flex items-center justify-center">
                <TagIcon className="text-white w-4 h-4" aria-hidden="true" />
              </span>
              <CurrencyDollarIcon
                // className={`${
                //   isBillable
                //     ? 'bg-green-400 rounded-full h-7  text-white cursor-pointer text-xl'
                //     : 'text-white cursor-pointer text-xl rounded-full h-7'
                // }`}
                aria-hidden="true"
                // onClick={() => setIsBillable(!isBillable)}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
