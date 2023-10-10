import { useMemo } from 'react';
import { useAppSelector } from '../../../../../../app/hooks';
import TimeSubTab from './TimeSubTab';
import ClockInOut from '../../../../../../components/Pilot/components/TimeClock/ClockInOut';
import ClockPreferences from '../../../../../../components/Pilot/components/TimeClock/ClockPreferences';
import ManualTimeAddDialog from '../../../../../../components/Pilot/components/TimeClock/ManualTimeDialog';

export const TimeClockOptions = [
  {
    id: 'in_out',
    element: <ClockInOut />
  },
  {
    id: 'manual_time_add',
    element: <ManualTimeAddDialog />
  },
  {
    id: 'clock_preference',
    element: <ClockPreferences />
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
