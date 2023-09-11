import SectionArea from '../../../../../../../components/Pilot/components/SectionArea';
import TimeClockIcon from '../../../../../../../assets/icons/TimeClockIcon';
import TimeClockTabs from '../../../../../hubs/components/PilotSection/components/TimeClock/subtabs/TimeClock';

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
