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
  const { duration } = useAppSelector((state) => state.task);

  const { intervalId, duration: timeData } = useGlobalCounter({
    duration: duration,
    localStateFn: setTime,
    localTrigger: isRunning
  });

  useEffect(() => {
    if (isRunning) {
      timerType === 'time-clock'
        ? dispatch(setUpdateTimerDuration(timeData))
        : dispatch(setUpdateRecoderDuration(timeData));
    }
    isRunning && timerType === 'time-clock'
      ? dispatch(setTimerInterval(intervalId))
      : dispatch(setRecorderInterval(intervalId));
  }, [isRunning, dispatch]);
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
      const newIntervalId = window.setInterval(() => {
        setTimerData((prevTimerData) => {
          const { h, m, s } = prevTimerData.duration;
          const updatedS = (s + 1) % 60;
          const updatedM = (m + (s === 0 ? 1 : 0)) % 60;
          const updatedH = (h + (m === 0 && s === 0 ? 1 : 0)) % 24;

          const updatedDuration = { h: updatedH, m: updatedM, s: updatedS };

          if (localStateFn) {
            localStateFn(updatedDuration);
          }

          return { intervalId: prevTimerData.intervalId, duration: updatedDuration };
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

    // Clean up the interval when the component unmounts
    return () => {
      if (timerData.intervalId) {
        clearInterval(timerData.intervalId);
      }
    };
  }, [localTrigger, localStateFn]);

  return timerData;
}
