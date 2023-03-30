import { ClockIcon } from '@heroicons/react/24/outline';
import SectionArea from '../../../../../../components/Pilot/components/SectionArea';
import TimeClockTabs from './subtabs/TimeClock';

export default function TimeClock() {
  return (
    <>
      <SectionArea label="Time Clock" icon={<ClockIcon className="w-4 h-4" />} />
      <>
        <TimeClockTabs />
      </>
    </>
  );
}
