import SectionArea from '../../../../../../../components/Pilot/components/SectionArea';
import PilotDeepLinksIcon from '../../../../../../../assets/icons/PilotDeepLinksIcon';
import TiesTabs from './subtabs/TiesTabs';

export default function Ties() {
  return (
    <>
      <SectionArea label="Ties" icon={<PilotDeepLinksIcon active={false} />} />
      <TiesTabs />
    </>
  );
}
