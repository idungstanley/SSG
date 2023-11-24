import SectionArea from '../../../../../../../components/Pilot/components/SectionArea';
import AutomationIcon from '../../../../../../../assets/icons/AutomationIcon';
import AutomationsTabs from './subtabs/AutomationsTabs';

export default function Automations() {
  return (
    <>
      <SectionArea label="Automations" icon={<AutomationIcon />} />
      <AutomationsTabs />
    </>
  );
}
