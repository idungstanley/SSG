import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { BsStopCircle } from 'react-icons/bs';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { CurrencyDollarIcon, TagIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ITimeEntriesRes } from '../../../../features/task/interface.tasks';
import {
  EndTimeEntriesService,
  GetTimeEntriesService,
  StartTimeEntryService
} from '../../../../features/task/taskService';
import AvatarWithInitials from '../../../avatar/AvatarWithInitials';
import { setTimerStatus } from '../../../../features/task/taskSlice';

export interface User {
  initials: string;
  // add other properties as needed
}

export default function ClockInOut() {
  const [data, setData] = useState({
    isBillable: false,
    description: ''
  });
  const { activeItemId, activeItemType, activeItemName } = useAppSelector((state) => state.workspace);
  const { timerStatus } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [btnClicked, setBtnClicked] = useState(false);
  const [period, setPeriod] = useState<string | number | undefined>(undefined);

  useEffect(() => {
    reset();
    return reset();
  }, [activeItemName]);
  const { initials } = JSON.parse(localStorage.getItem('user') as string) as User;

  const { data: getEntries } = GetTimeEntriesService({
    itemId: activeItemId,
    trigger: activeItemType === 'subhub' ? 'hub' : activeItemType
  });
  const mutation = EndTimeEntriesService();
  const { mutate } = StartTimeEntryService();

  const start = () => {
    mutate({
      taskId: activeItemId,
      type: activeItemType === 'subhub' ? 'hub' : activeItemType
    });
    if (timerStatus) {
      return setBtnClicked(!btnClicked);
    }
    setBtnClicked(!btnClicked);
    RunTimer();
    setPeriod(window.setInterval(RunTimer, 10));
  };
  const stop = () => {
    mutation.mutate({
      id: activeItemId,
      description: data.description,
      is_Billable: data.isBillable
    });
    reset();
    dispatch(setTimerStatus(false));
  };

  const handleEndTimeChange = (value: string) => {
    setData((prev) => ({ ...prev, isBillable: data.isBillable, description: value }));
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

  return (
    <div className="mt-6 p-2 rounded-t-md">
      <div className="bg-gray-100">
        <section id="body" className="bg-indigo-500 text-white rounded-b-md px-3 py-1">
          <div id="taskUser" className="flex justify-between items-center text-xs font-normal h-10 py-3 cursor-pointer">
            <span>Tags: </span>
            {/* total time here */}
            <p>{moment.utc((getEntries as ITimeEntriesRes)?.data?.total_duration * 1000).format('HH:mm:ss')}</p>
          </div>
          <div id="descNote" className="text-white w-full my-3">
            <input
              type="text"
              name="description"
              onChange={(e) => handleEndTimeChange(e.target.value)}
              placeholder="Enter a note"
              className="border-0 shadow-sm rounded text-gray-600 w-full"
            />
          </div>
          <div id="entries" className="py-1 flex items-center justify-between">
            <div id="left" className="flex items-center space-x-1 cursor-pointer">
              <div className="mr-1">
                {btnClicked ? (
                  !btnClicked && !timerStatus ? (
                    <button onClick={start}>
                      <AiOutlinePlayCircle className="text-green-500 cursor-pointer text-2xl" aria-hidden="true" />
                    </button>
                  ) : (
                    <button onClick={stop}>
                      <BsStopCircle className="text-red-400 cursor-pointer text-2xl" aria-hidden="true" />
                    </button>
                  )
                ) : (
                  <button onClick={start}>
                    <AiOutlinePlayCircle className="text-green-500 cursor-pointer text-2xl" aria-hidden="true" />
                  </button>
                )}
              </div>
              {/* timer goes here */}
              <div className="items-center">
                {time.h < 10 ? `0${time.h}` : time.h}
                {':'}
                {time.m < 10 ? `0${time.m}` : time.m}
                {':'}
                {time.s < 10 ? `0${time.s}` : time.s}
              </div>
              <div className="flex items-center justify-start cursor-pointer -space-x-4">
                <AvatarWithInitials height="h-7" width="w-7" initials={initials} />
              </div>
            </div>
            <div id="right" className="flex items-center space-x-1">
              <span className="border-dotted border-white border-2 rounded-full p-1 ml-1 flex items-center justify-center">
                <TagIcon className="h-5 text-white" aria-hidden="true" />
              </span>
              <CurrencyDollarIcon
                className={`${
                  data.isBillable
                    ? 'bg-green-400 rounded-full h-9  text-white cursor-pointer text-xl'
                    : 'text-white cursor-pointer text-xl rounded-full h-9'
                }`}
                aria-hidden="true"
                onClick={() =>
                  setData((prev) => ({ ...prev, isBillable: !data.isBillable, description: data.description }))
                }
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}