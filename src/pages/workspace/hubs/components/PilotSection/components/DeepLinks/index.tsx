import SectionArea from '../../../../../../../components/Pilot/components/SectionArea';
import DeepLinksIcon from '../../../../../../../assets/icons/DeepLinksIcon';
import DeepLinksTabs from './subtabs/DeepLinksTabs';

export default function DeepLinks() {
  return (
    <>
      <SectionArea label="Deep links" icon={<DeepLinksIcon />} />
      <DeepLinksTabs />
    </>
  );
}
