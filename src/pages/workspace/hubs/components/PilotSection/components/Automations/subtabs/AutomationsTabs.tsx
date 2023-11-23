import { useAppSelector } from '../../../../../../../../app/hooks';
import AutomationsSubTabs from './AutomationsSubTabs';

export default function AutomationsTabs() {
  const { showPilot } = useAppSelector((state) => state.workspace);

  return <section className="flex flex-col h-full">{showPilot && <AutomationsSubTabs />}</section>;
}
