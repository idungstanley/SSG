import React, { useState } from 'react';
import { BsStopCircle } from 'react-icons/bs';
import { TagOutlined } from '@ant-design/icons';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import {
  EndTimeEntriesService,
  StartTimeEntryService,
} from '../../../../../../../features/task/taskService';
import { useAppSelector } from '../../../../../../../app/hooks';

export default function ClockInOutIndex() {
  const [startTimeClicked, setStartTimeClicked] = useState(false);
  const [stopTimeClock, setStopTimeClock] = useState(false);
  const [isBillable, setIsBillable] = useState(false);
  const { activeItemId, activeItemType } = useAppSelector(
    (state) => state.workspace
  );

  StartTimeEntryService({
    taskId: activeItemId,
    trigger: startTimeClicked,
  });

  EndTimeEntriesService({
    taskId: activeItemId,
    trigger: stopTimeClock,
  });

  const handleTimeTrigger = () => {
    setStartTimeClicked(!startTimeClicked);
    if (startTimeClicked) {
      setStopTimeClock(!stopTimeClock);
    }
  };
  return (
    <div className="mt-6 p-2 rounded-t-md">
      <div className="bg-gray-100">
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
                <TagOutlined className="text-white" aria-hidden="true" />
              </span>
              <CurrencyDollarIcon
                className={`${
                  isBillable
                    ? 'bg-green-400 rounded-full h-7  text-white cursor-pointer text-xl'
                    : 'text-white cursor-pointer text-xl rounded-full h-7'
                }`}
                aria-hidden="true"
                onClick={() => setIsBillable(!isBillable)}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
