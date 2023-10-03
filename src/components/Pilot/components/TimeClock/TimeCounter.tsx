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

export function TimerCheck() {
  const dispatch = useAppDispatch();

  const { workSpaceId, hubId, subhubId, listId, taskId } = useParams();
  const { activeItemId, activeItemType, timerLastMemory, activeTabId } = useAppSelector((state) => state.workspace);
  const { duration, timerStatus, period, timerDetails } = useAppSelector((state) => state.task);
  const { clock_limit, clock_stop_reminder } = useAppSelector((state) => state.userSetting);

  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [isRunning, setRunning] = useState(false);

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
  const handleStartTime = () => start();

  useEffect(() => {
    RunTimer;
    setTime(duration);
  }, [isRunning, duration]);

  if (
    (activeItemType === EntityType.hub || activeItemType === EntityType.list || activeItemType === EntityType.task) &&
    (activeItemId === timerLastMemory.hubId ||
      activeItemId === timerLastMemory.listId ||
      activeItemId === timerLastMemory.taskId)
  ) {
    return (
      <div className="flex justify-center items-center text-alsoit-text-md w-14 tracking-widest">
        <div>
          {timerStatus ? (
            <StopIcon className="w-4 h-4cursor-pointer" onClick={() => stop()} />
          ) : (
            <StartIcon className="w-4 h-4cursor-pointer" />
          )}
        </div>
        <span>
          {`${String(duration.h).padStart(2, '0')}:${String(duration.m).padStart(2, '0')}:${String(duration.s).padStart(
            2,
            '0'
          )}`}
        </span>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center text-alsoit-text-md w-14 tracking-widest">
      <div>
        {timerStatus ? (
          <StopIcon className="w-4 h-4 cursor-pointer" onClick={() => stop()} />
        ) : (
          <StartIcon className="w-4 h-4 cursor-pointer" onClick={() => handleStartTime()} />
        )}
      </div>
      <span>
        {`${String(time.h).padStart(2, '0')}:${String(time.m).padStart(2, '0')}:${String(time.s).padStart(2, '0')}`}
      </span>
    </div>
  );
}
