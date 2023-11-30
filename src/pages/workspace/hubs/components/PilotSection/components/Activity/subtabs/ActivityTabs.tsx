import { useAppSelector } from '../../../../../../../../app/hooks';
import ActivitySubTabs from './ActivitySubTabs';

export default function ActivityTabs() {
  const { showPilot } = useAppSelector((state) => state.workspace);

  return <section className="flex flex-col h-full">{showPilot && <ActivitySubTabs />}</section>;
}
