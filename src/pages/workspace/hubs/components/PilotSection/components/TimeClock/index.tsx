import SectionArea from '../../../../../../../components/Pilot/components/SectionArea';
import TimeClockTabs from './subtabs/TimeClock';
import { UtilityIcon } from '../../../../../../../assets/icons/Utility';

export default function TimeClock() {
  return (
    <>
      <SectionArea label="Utilities" icon={<UtilityIcon />} />
      <>
        <TimeClockTabs />
      </>
    </>
  );
}
