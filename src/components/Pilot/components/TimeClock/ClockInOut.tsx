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
import { setTimerInterval, setTimerStatus, setUpdateTimerDuration } from '../../../../features/task/taskSlice';
import { useParams } from 'react-router-dom';
import { setTimerLastMemory } from '../../../../features/workspace/workspaceSlice';

export interface User {
  initials: string;
  // add other properties as needed
}

export default function ClockInOut() {
  const [data, setData] = useState({
    isBillable: false,
    description: ''
  });
  const { activeItemId, activeItemType, activeTabId } = useAppSelector((state) => state.workspace);
  const { timerStatus, duration, period } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const [, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [, setBtnClicked] = useState(false);
  // const [period, setPeriod] = useState<string | number | undefined>(undefined);
  const { workSpaceId, listId, hubId } = useParams();

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
      return dispatch(setTimerStatus(false));
    }
    dispatch(setTimerStatus(!timerStatus));
    RunTimer();
    dispatch(setTimerInterval(window.setInterval(RunTimer, 1000)));
    dispatch(setTimerLastMemory({ workSpaceId, hubId, listId, activeTabId }));
  };
  const stop = () => {
    mutation.mutate({
      id: activeItemId,
      description: data.description,
      is_Billable: data.isBillable
    });
    reset();
    setTime({ s: 0, m: 0, h: 0 });
    dispatch(setTimerStatus(false));
    dispatch(setTimerInterval());
    clearInterval(period);
  };

  const handleEndTimeChange = (value: string) => {
    setData((prev) => ({ ...prev, isBillable: data.isBillable, description: value }));
  };

  const reset = () => {
    clearInterval(period);
    setBtnClicked(false);
    setTime({ s: 0, m: 0, h: 0 });
  };

  let updateH = duration.h,
    updateM = duration.m,
    updateS = duration.s;
  const RunTimer = () => {
    if (updateM >= 59) {
      updateH++;
      updateM = 0;
    }
    if (updateS >= 59) {
      updateM++;
      updateS = 0;
    }
    updateS++;
    return dispatch(setUpdateTimerDuration({ s: updateS, m: updateM, h: updateH }));
  };

  useEffect(() => {
    setTime(duration);
  }, [dispatch]);

  console.log(timerStatus);

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
                {timerStatus ? (
                  // !btnClicked && !timerStatus ? (
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
              <div className="items-center">
                {duration.h < 10 ? `0${duration.h}` : duration.h}
                {':'}
                {duration.m < 10 ? `0${duration.m}` : duration.m}
                {':'}
                {duration.s < 10 ? `0${duration.s}` : duration.s}
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
