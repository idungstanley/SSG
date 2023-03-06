import React, { useMemo } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import TimeSubTab from './TimeSubTab';
import ClockLogIndex from './index/ClockLogIndex';
import ClockInOutIndex from './index/ClockInOutIndex';
import ClockPreference from './index/ClockPreference';

export const TimeClockOptions = [
  {
    id: 0,
    element: <ClockInOutIndex />
  },
  {
    id: 1,
    element: <ClockLogIndex />
  },
  {
    id: 2,
    element: <ClockPreference />
  }
];
export default function TimeClock() {
  const { activeSubTimeClockTabId, showPilot } = useAppSelector((state) => state.workspace);
  const selectedSubSection = useMemo(
    () => TimeClockOptions.find((option) => option.id === activeSubTimeClockTabId),
    [activeSubTimeClockTabId]
  );
  return (
    <section className={'flex flex-col h-full'}>
      {showPilot && <TimeSubTab />}
      <div>{selectedSubSection ? selectedSubSection.element : null}</div>
    </section>
  );
}
