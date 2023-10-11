import { useMemo } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import TimeSubTab from './TimeSubTab';
import ClockInOut from '../../../../../../components/Pilot/components/TimeClock/ClockInOut';

export const TimeClockOptions = [
  {
    id: 'in_out',
    element: <ClockInOut />
  }
];

export default function TimeClock() {
  const { activeSubTimeClockTabId, showPilot } = useAppSelector((state) => state.workspace);

  const selectedSubSection = useMemo(
    () => TimeClockOptions.find((option) => option.id === activeSubTimeClockTabId),
    [activeSubTimeClockTabId]
  );

  return (
    <section className="flex flex-col h-full">
      {showPilot && <TimeSubTab />}
      <div>{selectedSubSection ? selectedSubSection.element : null}</div>
    </section>
  );
}
