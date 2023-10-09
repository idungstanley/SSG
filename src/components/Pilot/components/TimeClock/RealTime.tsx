import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import {
  setActiveTimeout,
  setTimerInterval,
  setTimerStatus,
  setUpdateTimerDuration
} from '../../../../features/task/taskSlice';
import { setTimerLastMemory } from '../../../../features/workspace/workspaceSlice';
import { useParams } from 'react-router-dom';
import { EndTimeEntriesService, StartTimeEntryService } from '../../../../features/task/taskService';
import { StartIcon } from '../../../../assets/icons/StartIcon';
import { StopIcon } from '@heroicons/react/24/solid';
import { runTimer } from '../../../../utils/TimerCounter';

export function RealTime() {
  const dispatch = useAppDispatch();

  const { workSpaceId, hubId, subhubId, listId, taskId } = useParams();
  const { activeItemId, activeItemType, timerLastMemory, activeTabId } = useAppSelector((state) => state.workspace);
  const { duration, timerStatus, period, timerDetails } = useAppSelector((state) => state.task);
  const { clock_limit, clock_stop_reminder } = useAppSelector((state) => state.userSetting);

  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [isRunning, setRunning] = useState(false);
  const [prompt, setPrompt] = useState<boolean>(false);
  const [newTimer, setNewTimer] = useState<boolean>(false);

  const mutation = EndTimeEntriesService();
  const { mutate } = StartTimeEntryService();

  const start = () => {
    mutate({
      taskId: activeItemId,
      type: activeItemType === EntityType.subHub ? EntityType.hub : activeItemType
    });
    if (timerStatus) {
      return dispatch(setTimerStatus(false));
    }
    dispatch(setTimerStatus(!timerStatus));
    dispatch(setActiveTimeout({ clockLimit: clock_limit, timeoutReminder: clock_stop_reminder }));
    setRunning(true);
    dispatch(setTimerLastMemory({ workSpaceId, hubId, subhubId, listId, taskId, activeTabId }));
  };

  const reset = () => {
    clearInterval(period);
    setTime({ s: 0, m: 0, h: 0 });
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
    dispatch(setActiveTimeout({ clockLimit: 0, timeoutReminder: 0 }));
    clearInterval(period);
    dispatch(setUpdateTimerDuration({ s: 0, m: 0, h: 0 }));
    dispatch(setTimerInterval());
  };

  const RunTimer = runTimer({ isRunning: isRunning, setTime: setTime });

  const handleStartTime = () => {
    if (timerStatus) {
      setPrompt(true);
    } else {
      start();
      setPrompt(false);
    }
  };

  const sameEntity = () => activeItemId === (timerLastMemory.taskId || timerLastMemory.hubId || timerLastMemory.listId);

  const handleTimeSwitch = () => {
    stop();
    setPrompt(false);
    setNewTimer(!newTimer);
  };

  useEffect(() => {
    RunTimer;
  }, [isRunning]);

  useEffect(() => {
    newTimer && start();
  }, [newTimer]);

  if (
    (activeItemType === EntityType.hub || activeItemType === EntityType.list || activeItemType === EntityType.task) &&
    (activeItemId === timerLastMemory.hubId ||
      activeItemId === timerLastMemory.listId ||
      activeItemId === timerLastMemory.taskId)
  ) {
    return (
      <div className="flex justify-center items-center text-alsoit-text-md w-14 tracking-wide relative">
        <div>
          {timerStatus && sameEntity() ? (
            <StopIcon className="w-4 h-4 cursor-pointer" onClick={() => stop()} />
          ) : (
            <StartIcon className="w-4 h-4 cursor-pointer" onClick={() => handleStartTime()} />
          )}
        </div>
        <span>
          {`${String(duration.h).padStart(2, '0')}:${String(duration.m).padStart(2, '0')}:${String(duration.s).padStart(
            2,
            '0'
          )}`}
        </span>
        {/* Active Timer Prompt */}
        {prompt && (
          <div className="absolute z-40 flex flex-col p-2 space-y-1 rounded-lg shadow-2xl top-5 bg-alsoit-gray-75 w-72">
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
    );
  }
  return (
    <div className="flex justify-center items-center text-alsoit-text-md w-12 tracking-wide">
      <div>
        <StartIcon className="w-4 h-4 cursor-pointer" onClick={() => handleStartTime()} />
      </div>
      <span>
        {`${String(time.h).padStart(2, '0')}:${String(time.m).padStart(2, '0')}:${String(time.s).padStart(2, '0')}`}
      </span>
    </div>
  );
}
