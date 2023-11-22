import { useAppSelector } from '../../../../../../../../app/hooks';
import TicketsSubTabs from './TicketsSubTabs';

export default function TicketsTabs() {
  const { showPilot } = useAppSelector((state) => state.workspace);

  return <section className="flex flex-col h-full">{showPilot && <TicketsSubTabs />}</section>;
}
