import React, { useEffect, useMemo } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import TimeSubTab from './TimeSubTab';
import ClockInOut from '../../../../../../components/Pilot/components/TimeClock/ClockInOut';
import ClockLog from '../../../../../../components/Pilot/components/TimeClock/ClockLog';
import ClockPreferences from '../../../../../../components/Pilot/components/TimeClock/ClockPreferences';
import { getCurrentTime } from '../../../../../../features/task/taskService';

export const TimeClockOptions = [
  {
    id: 0,
    element: <ClockInOut />
  },
  {
    id: 1,
    element: <ClockLog />
  },
  {
    id: 2,
    element: <ClockPreferences />
  }
];
export default function TimeClock() {
  const { activeSubTimeClockTabId, showPilot, activeItemId } = useAppSelector((state) => state.workspace);
  const selectedSubSection = useMemo(
    () => TimeClockOptions.find((option) => option.id === activeSubTimeClockTabId),
    [activeSubTimeClockTabId]
  );

  const timeRecord = getCurrentTime();

  useEffect(() => {
    timeRecord;
  }, [activeItemId]);
  return (
    <section className="flex flex-col h-full">
      {showPilot && <TimeSubTab />}
      <div>{selectedSubSection ? selectedSubSection.element : null}</div>
    </section>
  );
}
