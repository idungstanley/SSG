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
import { setTimerInterval, setTimerStatus } from '../../../../features/task/taskSlice';
import { useParams } from 'react-router-dom';
import { setTimerLastMemory } from '../../../../features/workspace/workspaceSlice';
import { runTimer } from '../../../../utils/TimerCounter';

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
              <div className="mr-1 relative flex items-center">
                {timerStatus && sameEntity() ? (
                  // !btnClicked && !timerStatus ? (
                  <button onClick={stop}>
                    <BsStopCircle className="text-2xl h-4 w-4 text-red-400 cursor-pointer" aria-hidden="true" />
                  </button>
                ) : (
                  <button onClick={() => activeTimerCheck()}>
                    <AiOutlinePlayCircle
                      className="text-2xl h-4 w-4 text-green-500 cursor-pointer"
                      aria-hidden="true"
                    />
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
                {getCurrent?.data.time_entries.map((entry) => {
                  const { team_member } = entry;
                  return (
                    <div key={entry.id} className="flex -space-x-2">
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
        <div className="w-full p-2 my-4">
          {getCurrent?.data.time_entries && getCurrent?.data.time_entries.length > 0 ? (
            <div>
              <table className="w-full">
                <thead className="flex justify-start space-x-28 py-1 items-center border-b-2 border-gray-300">
                  <th>User</th>
                  <th>Duration</th>
                </thead>
                <tbody className="w-full">
                  {getCurrent.data.time_entries.map((entry) => {
                    return (
                      <tr key={entry.id} className="space-x-4 flex py-2 border-b-2 items-center">
                        <td className="text-sm text-gray-600">{entry.team_member.user.name}</td>
                        <td className="text-sm text-gray-600">
                          within {moment.duration(moment().diff(entry.start_date)).humanize()} ago
                        </td>
                        <td className="text-sm text-gray-600">{entry.description}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-600 text-center">No active timer found for this entity</div>
          )}
        </div>
      </div>
    </div>
  );
}
