import SectionArea from '../../../../../../../components/Pilot/components/SectionArea';
import FormsPilotIcon from '../../../../../../../assets/icons/FormsPilotIcon';
import FormsTabs from './subtabs/FormsTabs';

export default function Forms() {
  return (
    <>
      <SectionArea label="Forms" icon={<FormsPilotIcon />} />
      <FormsTabs />
    </>
  );
}
