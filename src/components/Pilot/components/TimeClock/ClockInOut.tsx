import moment from 'moment-timezone';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
  const { activeItemId, activeItemType, activeTabId, timerLastMemory } = useAppSelector((state) => state.workspace);
  const { timerStatus, duration, period } = useAppSelector((state) => state.task);
  const { initials } = useAppSelector((state) => state.userSetting);
  const dispatch = useAppDispatch();
  const [isRunning, setRunning] = useState(false);
  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [, setBtnClicked] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const { workSpaceId, listId, hubId } = useParams();

  const { data: getEntries } = GetTimeEntriesService({
    itemId: activeItemId,
    trigger: activeItemType === 'subhub' ? 'hub' : activeItemType
  });
  // Get currently active timers
  const { data: getCurrent } = GetTimeEntriesService({
    itemId: activeItemId,
    trigger: activeItemType === 'subhub' ? 'hub' : activeItemType,
    is_active: 1
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
    setRunning(true);
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
    setRunning(false);
    dispatch(setTimerStatus(false));
    clearInterval(period);
    dispatch(setTimerInterval(undefined));
    // localStorage.removeItem('lastActiveTimerData');
  };

  function timerCheck() {
    if (
      (activeItemType === 'hub' || activeItemType === 'list') &&
      (activeItemId === timerLastMemory.hubId || activeItemId === timerLastMemory.listId)
    ) {
      return (
        <div className="items-center">
          {`${String(duration.h).padStart(2, '0')}:${String(duration.m).padStart(2, '0')}:${String(duration.s).padStart(
            2,
            '0'
          )}`}
        </div>
      );
    }

    return (
      <div className="items-center">
        {`${String(time.h).padStart(2, '0')}:${String(time.m).padStart(2, '0')}:${String(time.s).padStart(2, '0')}`}
      </div>
    );
  }

  const activeTimerCheck = () => {
    if (timerStatus) {
      setPrompt(true);
    } else {
      start();
      setPrompt(false);
    }
  };

  const handleTimeSwitch = () => {
    stop();
    setPrompt(false);
  };

  const sameEntity = () => activeItemId === (timerLastMemory.hubId || timerLastMemory.listId);

  const handleEndTimeChange = (value: string) => {
    setData((prev) => ({ ...prev, isBillable: data.isBillable, description: value }));
  };

  const reset = () => {
    clearInterval(period);
    setBtnClicked(false);
    setTime({ s: 0, m: 0, h: 0 });
  };

  const RunTimer = runTimer({ isRunning: isRunning, setTime: setTime });

  useEffect(() => {
    RunTimer;
  }, [isRunning]);

  // let updateH = 0,
  //   updateM = 0,
  //   updateS = 0;
  // const RunTimer = () => {
  //   if (updateM >= 59) {
  //     updateH++;
  //     updateM = 0;
  //   }
  //   if (updateS >= 59) {
  //     updateM++;
  //     updateS = 0;
  //   }
  //   updateS++;
  //   setTime({ h: updateH, m: updateM, s: updateS });
  //   return dispatch(setUpdateTimerDuration({ s: updateS, m: updateM, h: updateH }));
  // };

  return (
    <div className="p-2 mt-6 rounded-t-md">
      <div className="bg-gray-100">
        <section id="body" className="px-3 py-1 text-white bg-indigo-500 rounded-b-md">
          <div id="taskUser" className="flex items-center justify-between h-10 py-3 text-xs font-normal cursor-pointer">
            <span>Tags: </span>
            {/* total time here */}
            <p>{moment.utc((getEntries as ITimeEntriesRes)?.data?.total_duration * 1000).format('HH:mm:ss')}</p>
          </div>
          <div id="descNote" className="w-full my-3 text-white">
            <input
              type="text"
              name="description"
              onChange={(e) => handleEndTimeChange(e.target.value)}
              placeholder="Enter a note"
              className="w-full text-gray-600 border-0 rounded shadow-sm"
            />
          </div>
          <div id="entries" className="flex items-center justify-between py-1">
            <div id="left" className="flex items-center space-x-1 cursor-pointer">
              <div className="mr-1 relative">
                {timerStatus && sameEntity() ? (
                  // !btnClicked && !timerStatus ? (
                  <button onClick={stop}>
                    <BsStopCircle className="text-2xl text-red-400 cursor-pointer" aria-hidden="true" />
                  </button>
                ) : (
                  <button onClick={() => activeTimerCheck()}>
                    <AiOutlinePlayCircle className="text-2xl text-green-500 cursor-pointer" aria-hidden="true" />
                  </button>
                )}
                {prompt && (
                  <div className="absolute p-2 rounded-lg shadow-2xl flex flex-col space-y-1 bg-gray-100 z-50 min-w-max">
                    <span className="text-center text-gray-700">Another Timer Already Running</span>
                    <div className="flex w-full space-x-1 justify-end">
                      <button
                        className="bg-purple-500 hover:bg-purple-600 text-white p-1 rounded-lg font-bold"
                        onClick={() => handleTimeSwitch()}
                      >
                        Stop Active Timer
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* timer goes here */}
              {timerCheck()}
              <div className="flex items-center justify-start -space-x-4 cursor-pointer">
                <AvatarWithInitials height="h-7" width="w-7" initials={initials ?? ''} />
              </div>
            </div>
            <div id="right" className="flex items-center space-x-1">
              <span className="flex items-center justify-center p-1 ml-1 border-2 border-white border-dotted rounded-full">
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

interface TimerProps {
  isRunning: boolean;
  isActiveInterval?: boolean;
  setTime?: Dispatch<SetStateAction<{ s: number; m: number; h: number }>>;
}

export function runTimer({ isRunning, isActiveInterval, setTime }: TimerProps) {
  const dispatch = useAppDispatch();
  const { duration, period } = useAppSelector((state) => state.task);
  console.log(period);

  useEffect(() => {
    let updateH = duration.h;
    let updateM = duration.m;
    let updateS = duration.s;

    let interval: number | undefined;

    if (isRunning) {
      interval = window.setInterval(() => {
        if (updateM >= 59) {
          updateH++;
          updateM = 0;
        }
        if (updateS >= 59) {
          updateM++;
          updateS = 0;
        }
        updateS++;

        setTime && setTime({ h: updateH, m: updateM, s: updateS });
        dispatch(setUpdateTimerDuration({ s: updateS, m: updateM, h: updateH }));
      }, 1000);
    }

    !isActiveInterval && dispatch(setTimerInterval(interval));
  }, [isRunning, dispatch]);
}
