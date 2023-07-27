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
import {
  setTimerDetails,
  setTimerInterval,
  setTimerStatus,
  setUpdateTimerDuration
} from '../../../../features/task/taskSlice';
import { useParams } from 'react-router-dom';
import { setTimerLastMemory } from '../../../../features/workspace/workspaceSlice';
import { runTimer } from '../../../../utils/TimerCounter';
import Duration from '../../../../utils/TimerDuration';
import ClockLog from './ClockLog';

export interface User {
  initials: string;
}

export default function ClockInOut() {
  const { activeItemId, activeItemType, activeTabId, timerLastMemory } = useAppSelector((state) => state.workspace);
  const { timerStatus, duration, period, timerDetails } = useAppSelector((state) => state.task);
  const { initials } = useAppSelector((state) => state.userSetting);
  const { currentUserId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isRunning, setRunning] = useState(false);
  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [, setBtnClicked] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [newTimer, setNewtimer] = useState(false);
  const { workSpaceId, hubId, listId, taskId } = useParams();

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
    dispatch(setTimerLastMemory({ workSpaceId, hubId, listId, taskId, activeTabId }));
  };

  const stop = () => {
    mutation.mutate({
      id: activeItemId,
      description: timerDetails.description,
      is_Billable: timerDetails.isBillable
    });
    reset();
    setTime({ s: 0, m: 0, h: 0 });
    setRunning(false);
    dispatch(setTimerStatus(false));
    clearInterval(period);
    dispatch(setUpdateTimerDuration({ s: 0, m: 0, h: 0 }));
    dispatch(setTimerInterval());
  };

  function timerCheck() {
    if (
      (activeItemType === 'hub' || activeItemType === 'list' || activeItemType === 'task') &&
      (activeItemId === timerLastMemory.hubId ||
        activeItemId === timerLastMemory.listId ||
        activeItemId === timerLastMemory.taskId)
    ) {
      return (
        <div className="items-center text-alsoit-text-md">
          {`${String(duration.h).padStart(2, '0')}:${String(duration.m).padStart(2, '0')}:${String(duration.s).padStart(
            2,
            '0'
          )}`}
        </div>
      );
    }

    return (
      <div className="items-center text-alsoit-text-md">
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

  const sameEntity = () => activeItemId === (timerLastMemory.taskId || timerLastMemory.hubId || timerLastMemory.listId);
  const handleEndTimeChange = (value: string) => {
    dispatch(setTimerDetails({ ...timerDetails, isBillable: timerDetails.isBillable, description: value }));
  };

  const reset = () => {
    clearInterval(period);
    setBtnClicked(false);
    setTime({ s: 0, m: 0, h: 0 });
  };

  const activeTrackers = getCurrent?.data.time_entries.filter(
    (tracker) => tracker.team_member.user.id !== currentUserId
  );

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
            className="flex items-center justify-between h-10 py-3 font-semibold cursor-pointer text-alsoit-text-lg"
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
              className="w-full border-0 rounded shadow-sm text-alsoit-gray-300"
            />
          </div>
          <div id="entries" className="flex items-center justify-between py-1">
            <div id="left" className="flex items-center space-x-1 cursor-pointer">
              <div className="relative flex items-start mr-1">
                {timerStatus && sameEntity() ? (
                  <button onClick={stop}>
                    <BsStopCircle className="w-4 h-4 text-red-400 cursor-pointer" aria-hidden="true" />
                  </button>
                ) : (
                  <button onClick={() => activeTimerCheck()}>
                    <AiOutlinePlayCircle className="w-4 h-4 cursor-pointer text-alsoit-success" aria-hidden="true" />
                  </button>
                )}
                {prompt && (
                  <div className="absolute z-50 flex flex-col p-2 space-y-1 rounded-lg shadow-2xl top-5 bg-alsoit-gray-75 w-72">
                    <span className="text-center text-alsoit-gray-300">
                      Another Timer Already Running would you want to stop the active timer and continue here?
                    </span>
                    <div className="flex justify-end w-full space-x-1">
                      <button
                        className="p-1 font-bold text-white rounded-lg bg-alsoit-text hover:bg-alsoit-text-active"
                        onClick={() => setPrompt(false)}
                      >
                        No
                      </button>
                      <button
                        className="p-1 font-bold text-white rounded-lg bg-alsoit-text-active hover:bg-purple-600"
                        onClick={() => handleTimeSwitch()}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* timer goes here */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  {timerCheck()}
                  <AvatarWithInitials height="h-4" width="w-4" initials={initials ?? 'UN'} />
                </div>
                {activeTrackers?.map((trackers) => {
                  const { hours, minutes, seconds } = Duration({ dateString: trackers });
                  const { initials } = trackers.team_member.user;
                  return (
                    <div key={trackers.id} className="flex items-center space-x-2 space-y-1 overflow-y-auto w-44 h-min">
                      <div className="text-alsoit-text-md">
                        {`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
                          seconds
                        ).padStart(2, '0')}`}
                      </div>
                      <AvatarWithInitials height="h-4" width="w-4" textSize="text-alsoit-text-sm" initials={initials} />
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
                  timerDetails.isBillable
                    ? 'bg-alsoit-success rounded-full h-9  text-alsoit-gray-50 cursor-pointer text-alsoit-text-lg'
                    : 'text-alsoit-gray-50 cursor-pointer text-alsoit-text-lg rounded-full h-9'
                }`}
                aria-hidden="true"
                onClick={() => dispatch(setTimerDetails({ ...timerDetails, isBillable: !timerDetails.isBillable }))}
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
