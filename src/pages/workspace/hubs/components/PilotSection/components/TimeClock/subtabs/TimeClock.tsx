import { useMemo } from 'react';
import { useAppSelector } from '../../../../../../../../app/hooks';
import ClockInOut from '../../../../../../../../components/Pilot/components/TimeClock/ClockInOut';
import TimeSubTab from './TimeSubTab';
import RecordScreen from '../../../../../../../../components/Pilot/components/RecordScreen';
import { pilotTabs } from '../../../../../../../../app/constants/pilotTabs';

export const TimeClockOptions = [
  {
    id: pilotTabs.TIME_CLOCK,
    element: <ClockInOut />
  },
  {
    id: pilotTabs.SCREEN_RECORD,
    element: <RecordScreen />
  }
];

export default function TimeClockTabs() {
  const { showPilot, activeSubTimeClockTabId } = useAppSelector((state) => state.workspace);

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
