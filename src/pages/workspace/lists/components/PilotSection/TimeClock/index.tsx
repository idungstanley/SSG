import SectionArea from '../../../../../../components/Pilot/components/SectionArea';
import TimeClockTabs from './subtabs/TimeClock';
import TimeClockIcon from '../../../../../../assets/icons/TimeClockIcon';

export default function TimeClock() {
  return (
    <>
      <SectionArea label="Time Clock" icon={<TimeClockIcon />} />
      <>
        <TimeClockTabs />
      </>
    </>
  );
}
