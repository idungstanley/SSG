import { Dispatch, SetStateAction, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setTimerInterval, setUpdateTimerDuration } from '../features/task/taskSlice';

interface TimerProps {
  isRunning: boolean;
  isActiveInterval?: boolean;
  setTime?: Dispatch<SetStateAction<{ s: number; m: number; h: number }>>;
}

export function runTimer({ isRunning, setTime }: TimerProps) {
  const dispatch = useAppDispatch();
  const { duration } = useAppSelector((state) => state.task);

  const { interval, timeData } = GlobalCounter({
    duration: duration,
    localStateFn: setTime,
    localTrigger: isRunning
  });

  useEffect(() => {
    if (isRunning) {
      dispatch(setUpdateTimerDuration(timeData));
    }
    isRunning && dispatch(setTimerInterval(interval));
  }, [isRunning, dispatch]);
}

interface GlobalCounterProps {
  duration: { h: number; m: number; s: number };
  localTrigger: boolean;
  localStateFn?: Dispatch<SetStateAction<{ h: number; m: number; s: number }>>;
}

export function GlobalCounter({ duration, localStateFn, localTrigger }: GlobalCounterProps) {
  let updateH = duration.h;
  let updateM = duration.m;
  let updateS = duration.s;

  let interval: number | undefined;

  if (localTrigger) {
    interval = window.setInterval(() => {
      updateS = (updateS + 1) % 60;
      updateM = (updateM + (updateS === 0 ? 1 : 0)) % 60;
      updateH = (updateH + (updateM === 0 && updateS === 0 ? 1 : 0)) % 24;

      localStateFn && localStateFn({ h: updateH, m: updateM, s: updateS });
      return { s: updateS, m: updateM, h: updateH };
    }, 1000);
    return { interval: interval, timeData: duration };
  }
  return { interval: interval, timeData: duration };
}
