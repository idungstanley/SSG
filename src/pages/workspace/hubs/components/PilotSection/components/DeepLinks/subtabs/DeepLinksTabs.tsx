import { useAppSelector } from '../../../../../../../../app/hooks';
import DeepLinksSubTabs from './DeepLinksSubTabs';

export default function DeepLinksTabs() {
  const { showPilot } = useAppSelector((state) => state.workspace);

  return <section className="flex flex-col h-full">{showPilot && <DeepLinksSubTabs />}</section>;
}
