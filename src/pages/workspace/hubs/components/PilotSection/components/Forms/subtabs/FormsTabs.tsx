import { useAppSelector } from '../../../../../../../../app/hooks';
import FormsSubTabs from './FormsSubTabs';

export default function FormsTabs() {
  const { showPilot } = useAppSelector((state) => state.workspace);

  return <section className="flex flex-col h-full">{showPilot && <FormsSubTabs />}</section>;
}
