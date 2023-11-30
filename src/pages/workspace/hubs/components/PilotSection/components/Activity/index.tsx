import SectionArea from '../../../../../../../components/Pilot/components/SectionArea';
import PilotActivityIcon from '../../../../../../../assets/icons/PilotActivityIcon';
import ActivityTabs from './subtabs/ActivityTabs';

export default function Activity() {
  return (
    <>
      <SectionArea label="Activity" icon={<PilotActivityIcon active={false} />} />
      <ActivityTabs />
    </>
  );
}
