import { useAppSelector } from '../../../../../../../../app/hooks';
import EfficiencySubTabs from './EfficiencySubTabs';

export default function EfficiencyTabs() {
  const { showPilot } = useAppSelector((state) => state.workspace);

  return <section className="flex flex-col h-full">{showPilot && <EfficiencySubTabs />}</section>;
}
