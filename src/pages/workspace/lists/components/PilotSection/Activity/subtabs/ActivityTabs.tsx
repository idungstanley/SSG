import ActivitySubTabs from './ActivitySubTabs';
import { useAppSelector } from '../../../../../../../app/hooks';

export default function ActivityTabs() {
  const { showPilot } = useAppSelector((state) => state.workspace);

  return <section className="flex flex-col h-full">{showPilot && <ActivitySubTabs />}</section>;
}
