import TiesTabs from './subtabs/TiesTabs';
import PilotDeepLinksIcon from '../../../../../../assets/icons/PilotDeepLinksIcon';
import SectionArea from '../../../../../../components/Pilot/components/SectionArea';

export default function Ties() {
  return (
    <>
      <SectionArea label="Activity" icon={<PilotDeepLinksIcon active={false} />} />
      <TiesTabs />
    </>
  );
}
