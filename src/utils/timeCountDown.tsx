import { Dispatch, SetStateAction, useEffect } from 'react';
import { timeStringToMilliseconds } from './TimerDuration';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setCountDownPeriod, setEstimatedDuration } from '../features/task/taskSlice';
import { IDuration } from '../features/task/interface.tasks';

interface Props {
  countDown: string;
  setTimer: Dispatch<SetStateAction<IDuration>>;
}

export function runCountDown({ countDown, setTimer }: Props) {
  const { estimatedTimeStatus, estimatedDuration } = useAppSelector((state) => state.task);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const { formattedTime, milliseconds } = timeStringToMilliseconds(countDown);

    if (milliseconds > 0 && estimatedTimeStatus) {
      dispatch(setEstimatedDuration(formattedTime));

      const interval = window.setInterval(() => {
        const elapsed = { ...estimatedDuration };

        elapsed.s = (elapsed.s - 1 + 60) % 60;
        elapsed.m = (elapsed.m - (elapsed.s === 59 ? 1 : 0) + 60) % 60;
        elapsed.h = (elapsed.h - (elapsed.m === 59 && elapsed.s === 59 ? 1 : 0) + 24) % 24;
        setTimer(elapsed);
        dispatch(setEstimatedDuration(elapsed));
      }, 1000);
      dispatch(setCountDownPeriod(interval));
    }
  }, [countDown, estimatedTimeStatus]);
}
