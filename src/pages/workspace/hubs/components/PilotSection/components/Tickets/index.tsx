import SectionArea from '../../../../../../../components/Pilot/components/SectionArea';
import TicketsTabs from './subtabs/TicketsTabs';
import TicketsPilotIcon from '../../../../../../../assets/icons/TicketsPilotIcon';

export default function Tickets() {
  return (
    <>
      <SectionArea label="Tickets" icon={<TicketsPilotIcon />} />
      <TicketsTabs />
    </>
  );
}
