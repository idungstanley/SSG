import SectionArea from '../../../../../../../components/Pilot/components/SectionArea';
import EfficiencyTabs from './subtabs/EfficiencyTabs';
import PilotEfficiencyIcon from '../../../../../../../assets/icons/PilotEfficiencyIcon';

export default function Efficiency() {
  return (
    <>
      <SectionArea label="Efficiency" icon={<PilotEfficiencyIcon active={false} />} />
      <EfficiencyTabs />
    </>
  );
}
