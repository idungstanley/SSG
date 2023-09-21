import { Dispatch, SetStateAction, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setRecorderInterval, setUpdateRecoderDuration } from '../features/task/taskSlice';

interface TimerProps {
  isRunning: boolean;
  isActiveInterval?: boolean;
  setTime?: Dispatch<SetStateAction<{ s: number; m: number; h: number }>>;
}

export function runTimer({ isRunning, setTime }: TimerProps) {
  const dispatch = useAppDispatch();
  const { recorderDuration: duration, period } = useAppSelector((state) => state.task);

  useEffect(() => {
    let updateH = duration.h;
    let updateM = duration.m;
    let updateS = duration.s;

    let interval: number | undefined;

    if (isRunning) {
      interval = window.setInterval(() => {
        updateS = (updateS + 1) % 60;
        updateM = (updateM + (updateS === 0 ? 1 : 0)) % 60;
        updateH = (updateH + (updateM === 0 && updateS === 0 ? 1 : 0)) % 24;

        setTime && setTime({ h: updateH, m: updateM, s: updateS });
        dispatch(setUpdateRecoderDuration({ s: updateS, m: updateM, h: updateH }));
      }, 1000);
    }
    isRunning && !period && dispatch(setRecorderInterval(interval));
  }, [isRunning, dispatch]);
}
