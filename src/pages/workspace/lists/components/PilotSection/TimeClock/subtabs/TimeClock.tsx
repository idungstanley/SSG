import SectionArea from '../../../../../../../components/Pilot/components/SectionArea';
import TimeClockTabs from '../../../../../hubs/components/PilotSection/components/TimeClock/subtabs/TimeClock';
import { UtilityIcon } from '../../../../../../../assets/icons/Utility';

export default function TimeClock() {
  return (
    <>
      <SectionArea label="Utilites" icon={<UtilityIcon />} />
      <>
        <TimeClockTabs />
      </>
    </>
  );
}
