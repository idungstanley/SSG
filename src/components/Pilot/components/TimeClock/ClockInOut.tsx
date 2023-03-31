/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { BsStopCircle } from 'react-icons/bs';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { CurrencyDollarIcon, TagIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '../../../../app/hooks';
import { ITimeEntriesRes } from '../../../../features/task/interface.tasks';
import {
  EndTimeEntriesService,
  GetTimeEntriesService,
  StartTimeEntryService
} from '../../../../features/task/taskService';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';

export default function ClockInOut() {
  const [isBillable, setIsBillable] = useState(false);
  const { activeItemId, activeItemType, activeItemName } = useAppSelector((state) => state.workspace);
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [btnClicked, setBtnClicked] = useState(false);
  const [period, setPeriod] = useState(null);

  useEffect(() => {
    reset();
    return reset();
  }, [activeItemName]);

  const { mutate } = EndTimeEntriesService();
  const mutation = StartTimeEntryService();

  const start = () => {
    RunTimer();
    setBtnClicked(!btnClicked);
    mutation.mutate({
      taskId: activeItemId,
      type: activeItemType
    });
    setPeriod(setInterval(RunTimer, 10));
  };
  const stop = () => {
    mutate({
      id: activeItemId,
      description: '',
      is_Billable: isBillable
    });
    reset();
  };

  const reset = () => {
    clearInterval(period);
    setBtnClicked(false);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };

  let updateH = time.h,
    updateM = time.m,
    updateS = time.s,
    updateMS = time.ms;
  const RunTimer = () => {
    if (updateM >= 60) {
      updateH++;
      updateM = 0;
    }
    if (updateS >= 60) {
      updateM++;
      updateS = 0;
    }
    if (updateMS >= 100) {
      updateS++;
      updateMS = 0;
    }
    updateMS++;
    return setTime({ ms: updateMS, s: updateS, m: updateM, h: updateH });
  };

  const { data: getEntries } = GetTimeEntriesService({
    itemId: activeItemId,
    trigger: activeItemType
  });
  return (
    <div className="mt-6 p-2 rounded-t-md">
      <div className="bg-gray-100">
        <section id="body" className="bg-indigo-500 text-white rounded-b-md px-3 py-1">
          <div
            id="taskUser"
            className="flex justify-between items-center text-xs font-normal h-10 py-3 px-3 cursor-pointer"
          >
            <div className="p-2 flex items-center justify-start space-x-1 cursor-pointer">
              <AvatarWithInitials height="h-7" width="w-7" initials="AU" />
            </div>
            {/* total time here */}
            <p>{moment.utc((getEntries as ITimeEntriesRes)?.data?.total_duration * 1000).format('HH:mm:ss')}</p>
          </div>
          <div id="descNote" className="text-white w-full my-3">
            <input
              type="text"
              name="description"
              // onChange={handleEndTimeChange}
              placeholder="Enter a note"
              className="border-0 shadow-sm rounded text-gray-600 w-full"
            />
          </div>
          <div id="entries" className="px-3 py-1 flex items-center justify-between">
            <div id="left" className="flex items-center space-x-1 cursor-pointer">
              <div className="mr-1">
                {btnClicked ? (
                  <button onClick={stop}>
                    <BsStopCircle className="text-red-400 cursor-pointer text-2xl" aria-hidden="true" />
                  </button>
                ) : (
                  <button onClick={start}>
                    <AiOutlinePlayCircle className="text-green-500 cursor-pointer text-2xl" aria-hidden="true" />
                  </button>
                )}
              </div>
              {/* timer goes here */}
              {time.h < 10 ? `0${time.h}` : time.h}
              {':'}
              {time.m < 10 ? `0${time.m}` : time.m}
              {':'}
              {time.s < 10 ? `0${time.s}` : time.s}
            </div>
            <div id="right" className="flex items-center space-x-1">
              <span className="border-dotted border-white border-2 rounded-full p-1 ml-1 flex items-center justify-center">
                <TagIcon className="h-5 text-white" aria-hidden="true" />
              </span>
              <CurrencyDollarIcon
                className={`${
                  isBillable
                    ? 'bg-green-400 rounded-full h-9  text-white cursor-pointer text-xl'
                    : 'text-white cursor-pointer text-xl rounded-full h-9'
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
