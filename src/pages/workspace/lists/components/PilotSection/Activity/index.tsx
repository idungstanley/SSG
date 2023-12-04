import ActivityTabs from './subtabs/ActivityTabs';
import PilotActivityIcon from '../../../../../../assets/icons/PilotActivityIcon';
import SectionArea from '../../../../../../components/Pilot/components/SectionArea';

export default function Activity() {
  return (
    <>
      <SectionArea label="Activity" icon={<PilotActivityIcon active={false} />} />
      <ActivityTabs />
    </>
  );
}
