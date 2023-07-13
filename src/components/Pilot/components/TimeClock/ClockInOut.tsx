import moment from 'moment-timezone';
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
import { runTimer } from '../../../../utils/TimerCounter';
import ClockLog from './ClockLog';

export interface User {
  initials: string;
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
  const [newTimer, setNewtimer] = useState(false);
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
    dispatch(setUpdateTimerDuration({ s: 0, m: 0, h: 0 }));
    dispatch(setTimerInterval(undefined));
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
    setNewtimer(!newTimer);
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

  useEffect(() => {
    newTimer && start();
  }, [newTimer]);

  return (
    <div className="p-2 mt-6 rounded-t-md">
      <div className="bg-alsoit-gray-50">
        <section id="body" className="px-3 py-1 text-white bg-indigo-500 rounded-b-md">
          <div
            id="taskUser"
            className="flex items-center justify-between h-10 py-3 text-alsoit-text-lg font-semibold cursor-pointer"
          >
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
              className="w-full text-alsoit-gray-300 border-0 rounded shadow-sm"
            />
          </div>
          <div id="entries" className="flex items-center justify-between py-1">
            <div id="left" className="flex items-center space-x-1 cursor-pointer">
              <div className="mr-1 relative flex items-center">
                {timerStatus && sameEntity() ? (
                  <button onClick={stop}>
                    <BsStopCircle className="h-4 w-4 text-red-400 cursor-pointer" aria-hidden="true" />
                  </button>
                ) : (
                  <button onClick={() => activeTimerCheck()}>
                    <AiOutlinePlayCircle className="h-4 w-4 text-alsoit-success cursor-pointer" aria-hidden="true" />
                  </button>
                )}
                {prompt && (
                  <div className="absolute top-5 p-2 rounded-lg shadow-2xl flex flex-col space-y-1 bg-alsoit-gray-75 z-50 w-72">
                    <span className="text-center text-alsoit-gray-300">
                      Another Timer Already Running would you want to stop the active timer and continue here?
                    </span>
                    <div className="flex w-full space-x-1 justify-end">
                      <button
                        className="bg-alsoit-text hover:bg-alsoit-text-active text-white p-1 rounded-lg font-bold"
                        onClick={() => setPrompt(false)}
                      >
                        No
                      </button>
                      <button
                        className="bg-alsoit-text-active hover:bg-purple-600 text-white p-1 rounded-lg font-bold"
                        onClick={() => handleTimeSwitch()}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* timer goes here */}
              {timerCheck()}
              <div className="flex items-center justify-start -space-x-3 cursor-pointer">
                {getCurrent?.data.time_entries.map((entry) => {
                  const { team_member } = entry;
                  return (
                    <div key={entry.id} className="flex">
                      <AvatarWithInitials height="h-7" width="w-7" initials={team_member.user.initials ?? initials} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div id="right" className="flex items-center space-x-1">
              <span className="flex items-center justify-center p-1 ml-1 border-2 border-white border-dotted rounded-full">
                <TagIcon className="h-5 text-white" aria-hidden="true" />
              </span>
              <CurrencyDollarIcon
                className={`${
                  data.isBillable
                    ? 'bg-alsoit-success rounded-full h-9  text-alsoit-gray-50 cursor-pointer text-alsoit-text-lg'
                    : 'text-alsoit-gray-50 cursor-pointer text-alsoit-text-lg rounded-full h-9'
                }`}
                aria-hidden="true"
                onClick={() =>
                  setData((prev) => ({ ...prev, isBillable: !data.isBillable, description: data.description }))
                }
              />
            </div>
          </div>
        </section>
        <div className="w-full p-2 my-4">
          <ClockLog />
        </div>
      </div>
    </div>
  );
}
