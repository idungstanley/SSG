import TiesSubTabs from './TiesSubTabs';
import { useAppSelector } from '../../../../../../../app/hooks';

export default function TiesTabs() {
  const { showPilot } = useAppSelector((state) => state.workspace);

  return <section className="flex flex-col h-full">{showPilot && <TiesSubTabs />}</section>;
}
