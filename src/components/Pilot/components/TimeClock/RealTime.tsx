import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import {
  setActiveTimeout,
  setEstimatedDuration,
  setEstimatedTimeStatus,
  setTimeType,
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
import { CLOCK_TYPE, TIME_TABS } from '../../../../utils/Constants/TimeClockConstants';
import { TotalTimeIcon } from '../../../../assets/icons/TotalTimeIcon';
import ArrowDownFilled from '../../../../assets/icons/ArrowDownFilled';
import { TabsDropDown } from './TabsDropDown';
import { HourGlassIcon } from '../../../../assets/icons/HourGlass';
import { ClockIcon } from '../../../../assets/icons/ClockIcon';
import { timeStringToMilliseconds } from '../../../../utils/TimerDuration';

export function RealTime() {
  const dispatch = useAppDispatch();

  const { workSpaceId, hubId, subhubId, listId, taskId } = useParams();
  const { activeItemId, activeItemType, timerLastMemory, activeTabId } = useAppSelector((state) => state.workspace);
  const { duration, timerStatus, estimatedTimeStatus, estimatedDuration, period, timerDetails, timeType } =
    useAppSelector((state) => state.task);
  const { clock_limit, clock_stop_reminder } = useAppSelector((state) => state.userSetting);

  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [countDown, setCountDown] = useState<string>('00:00:00');
  const [isRunning, setRunning] = useState(false);
  const [prompt, setPrompt] = useState<boolean>(false);
  const [newTimer, setNewTimer] = useState<boolean>(false);
  const [dropDown, setDropDown] = useState<{ clockDropDown: boolean }>({
    clockDropDown: false
  });

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

  const handleChange = (e: string) => setCountDown(e);

  const sameEntity = () => activeItemId === (timerLastMemory.taskId || timerLastMemory.hubId || timerLastMemory.listId);

  const handleTimeSwitch = () => {
    stop();
    setPrompt(false);
    setNewTimer(!newTimer);
  };

  const clockTypes = () => {
    return (
      <div className="flex flex-col space-y-2">
        {CLOCK_TYPE.map((type, index) => {
          return (
            <div
              className="flex w-full items-center space-x-2 p-2 hover:bg-alsoit-purple-50 cursor-pointer rounded-md"
              key={index}
              onClick={() => dispatch(setTimeType(type.value))}
            >
              {type.value === 'timer' ? <HourGlassIcon className="w-4 h-4" /> : <ClockIcon />}
              <span className="capitalize font-semibold">{type.name}</span>
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    RunTimer;
  }, [isRunning]);

  useEffect(() => {
    newTimer && start();
  }, [newTimer]);

  useEffect(() => {
    const { formattedTime, milliseconds } = timeStringToMilliseconds(countDown);

    if (milliseconds > 0 && estimatedTimeStatus) {
      dispatch(setEstimatedDuration(formattedTime));

      const timer = () =>
        setInterval(() => {
          if (estimatedDuration.h === 0 && estimatedDuration.m === 0 && estimatedDuration.s === 0) {
            clearInterval(timer());
          } else {
            const elapsed = { ...estimatedDuration };

            elapsed.s = (elapsed.s - 1 + 60) % 60;
            elapsed.m = (elapsed.m - (elapsed.s === 59 ? 1 : 0) + 60) % 60;
            elapsed.h = (elapsed.h - (elapsed.m === 59 && elapsed.s === 59 ? 1 : 0) + 24) % 24;
            dispatch(setEstimatedDuration(elapsed));
          }
        }, 1000);
      timer();

      return () => clearInterval(timer());
    }
  }, [countDown, estimatedTimeStatus]);

  if (
    (activeItemType === EntityType.hub || activeItemType === EntityType.list || activeItemType === EntityType.task) &&
    (activeItemId === timerLastMemory.hubId ||
      activeItemId === timerLastMemory.listId ||
      activeItemId === timerLastMemory.taskId)
  ) {
    return (
      <div className="flex justify-center items-center text-alsoit-text-md w-full tracking-widest relative z-30">
        <div className="flex w-full -space-x-1.5">
          <div className="w-1/3 relative flex items-center -space-x-2 cursor-pointer">
            <TotalTimeIcon className="w-4 h-4" />
            <ArrowDownFilled
              className="cursor-pointer"
              onClick={() => setDropDown((prev) => ({ ...prev, clockDropDown: !prev.clockDropDown }))}
            />
            {dropDown.clockDropDown && (
              <TabsDropDown
                header="timeclock types"
                subHeader="select category"
                styles="w-44 left-0 top-6 px-1.5"
                subStyles="left-7"
                closeModal={() => setDropDown((prev) => ({ ...prev, clockDropDown: !prev.clockDropDown }))}
              >
                {clockTypes()}
              </TabsDropDown>
            )}
          </div>
          {timeType === TIME_TABS.clock ? (
            // clock timer
            <div className="flex items-center">
              <div className="flex items-center">
                {timerStatus && sameEntity() ? (
                  <StopIcon className="w-4 h-4 cursor-pointer" onClick={() => stop()} />
                ) : (
                  <StartIcon className="w-4 h-4 cursor-pointer" onClick={() => handleStartTime()} />
                )}
              </div>
              <span className="z-30 flex items-center">
                {`${String(duration.h).padStart(2, '0')}:${String(duration.m).padStart(2, '0')}:${String(
                  duration.s
                ).padStart(2, '0')}`}
              </span>
            </div>
          ) : (
            // Estimated Timer
            <input
              type="text"
              onChange={(e) => handleChange(e.target.value)}
              className="w-16 h-5 bg-none text-alsoit-text-md text-center tracking-wide px-1.5 border-none hover:ring-0 focus:ring-0"
              placeholder="05:00:00"
            />
          )}
        </div>
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
    <div className="flex justify-center items-center text-alsoit-text-md tracking-widest z-30">
      <div className="flex items-center w-full -space-x-1">
        <div className="w-1/3 relative flex items-center -space-x-2">
          {timeType === 'timer' ? <HourGlassIcon className="w-4 h-4" /> : <ClockIcon />}
          <ArrowDownFilled
            className="cursor-pointer"
            onClick={() => setDropDown((prev) => ({ ...prev, clockDropDown: !prev.clockDropDown }))}
          />
          {dropDown.clockDropDown && (
            <TabsDropDown
              header="timeclock types"
              subHeader="select category"
              styles="w-44 left-0 top-6 px-1.5"
              subStyles="left-7"
              closeModal={() => setDropDown((prev) => ({ ...prev, clockDropDown: !prev.clockDropDown }))}
            >
              {clockTypes()}
            </TabsDropDown>
          )}
        </div>
        {timeType === TIME_TABS.clock && (
          <div className="flex items-center">
            <div>
              <StartIcon className="w-4 h-4 cursor-pointer" onClick={() => handleStartTime()} />
            </div>
            <span>
              {`${String(time.h).padStart(2, '0')}:${String(time.m).padStart(2, '0')}:${String(time.s).padStart(
                2,
                '0'
              )}`}
            </span>
          </div>
        )}
        {timeType === TIME_TABS.timer && (
          <div className="flex items-center">
            <StartIcon className="w-4 h-4 cursor-pointer" onClick={() => dispatch(setEstimatedTimeStatus(true))} />
            <input
              type="text"
              onChange={(e) => handleChange(e.target.value)}
              className="w-16 h-5 bg-none text-alsoit-text-md text-center tracking-wide px-1.5 border-none hover:ring-0 focus:ring-0"
              placeholder="05:00:00"
            />
          </div>
        )}
      </div>
    </div>
  );
}
