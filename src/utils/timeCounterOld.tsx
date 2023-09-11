import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setRecorderInterval,
  setTimerInterval,
  setUpdateRecoderDuration,
  setUpdateTimerDuration
} from '../features/task/taskSlice';

interface TimerProps {
  isRunning: boolean;
  isActiveInterval?: boolean;
  setTime?: Dispatch<SetStateAction<{ s: number; m: number; h: number }>>;
  timerType: 'time-clock' | 'recorder-counter';
}

export function runTimer({ isRunning, setTime, timerType }: TimerProps) {
  const dispatch = useAppDispatch();
  const { duration, period } = useAppSelector((state) => state.task);

  const { intervalId, duration: timeData } = useGlobalCounter({
    duration: duration,
    localStateFn: setTime,
    localTrigger: isRunning
  });

  useEffect(() => {
    if (timerType === 'time-clock') {
      dispatch(setUpdateTimerDuration(timeData));
    } else {
      dispatch(setUpdateRecoderDuration(timeData));
    }
    isRunning && timerType === 'time-clock'
      ? period !== intervalId && dispatch(setTimerInterval(intervalId))
      : dispatch(setRecorderInterval(intervalId));
  }, [isRunning, dispatch, timeData]);
}

interface GlobalCounterProps {
  duration: { h: number; m: number; s: number };
  localTrigger: boolean;
  localStateFn?: Dispatch<SetStateAction<{ h: number; m: number; s: number }>>;
}

export function useGlobalCounter({ duration: initialDuration, localTrigger, localStateFn }: GlobalCounterProps) {
  const [timerData, setTimerData] = useState<{
    intervalId: number | undefined;
    duration: { h: number; m: number; s: number };
  }>({
    intervalId: undefined,
    duration: initialDuration
  });

  useEffect(() => {
    if (localTrigger) {
      // Reset the timer to the initial duration
      setTimerData((prevTimerData) => ({ ...prevTimerData, duration: initialDuration }));

      const newIntervalId = window.setInterval(() => {
        setTimerData((prevTimerData) => {
          let { h, m, s } = prevTimerData.duration;

          // Update seconds, minutes, and hours
          s = (s + 1) % 60;
          m = (m + (s === 0 ? 1 : 0)) % 60;
          h = (h + (m === 0 && s === 0 ? 1 : 0)) % 24;

          const updatedDuration = { h, m, s };

          if (localStateFn) {
            localStateFn(updatedDuration);
          }

          return { ...prevTimerData, duration: updatedDuration };
        });
      }, 1000);

      setTimerData((prevTimerData) => ({ ...prevTimerData, intervalId: newIntervalId }));
    } else {
      // Stop the timer if localTrigger is false
      if (timerData.intervalId) {
        clearInterval(timerData.intervalId);
        setTimerData((prevTimerData) => ({ ...prevTimerData, intervalId: undefined }));
      }
    }

    return () => {
      if (timerData.intervalId) {
        clearInterval(timerData.intervalId);
      }
    };
  }, [localTrigger, localStateFn, initialDuration]);

  return timerData;
}
