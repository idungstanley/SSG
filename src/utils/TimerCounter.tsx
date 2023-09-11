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

  useEffect(() => {
    let updateH = duration.h;
    let updateM = duration.m;
    let updateS = duration.s;

    let interval: number | undefined;
    console.log(isRunning);

    if (isRunning) {
      interval = window.setInterval(() => {
        updateS = (updateS + 1) % 60;
        updateM = (updateM + (updateS === 0 ? 1 : 0)) % 60;
        updateH = (updateH + (updateM === 0 && updateS === 0 ? 1 : 0)) % 24;

        setTime && setTime({ h: updateH, m: updateM, s: updateS });
        dispatch(setUpdateTimerDuration({ s: updateS, m: updateM, h: updateH }));
      }, 1000);
    }
    isRunning && dispatch(setTimerInterval(interval));
  }, [isRunning, duration]);
}
